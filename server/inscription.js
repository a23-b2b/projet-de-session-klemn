const express = require('express')
const app = express()
const { check, body, validationResult } = require('express-validator');
const { pool } = require('./serveur.js')
const { admin } = require('./serveur.js')


module.exports = app.post('/',
    [
        body('username')
            .notEmpty()
            .withMessage('Le pseudo ne peut pas être vide.')
            .isLength({ min: 3, max: 254 })
            .withMessage("Votre pseudo doit contenir entre 3 et 254 caractères")
            .matches(/^[a-zA-Z0-9\-_]+$/)
            .withMessage('Le pseudo contient des caractères interdits. Il doit contenir: a-Z, 0-9, -, _'),
        body('prenom')
            .notEmpty()
            .withMessage('Le prénom ne peut pas être vide.')
            .isLength({ max: 254 })
            .withMessage("Le prénom doit faire moins de 254 caractères."),
        body('nom')
            .notEmpty()
            .withMessage('Le nom ne peut pas être vide.')
            .isLength({ max: 254 })
            .withMessage("Le nom doit faire moins de 254 caractères."),
    ], (req, res) => {
        const resultatValidation = validationResult(req);
        if (resultatValidation.isEmpty()) {
            
            const username = req.body.username;
            const prenom = req.body.prenom;
            const nom = req.body.nom;

            const userToken = req.headers.authorization;

            admin.auth().verifyIdToken(userToken, true).then((payload) => {

                const userId = payload.uid;
                const email = payload.email;

                pool.query(
                    `INSERT INTO compte (
                    id_compte, 
                    date_creation_compte, 
                    nom, 
                    prenom, 
                    nom_utilisateur, 
                    courriel, 
                    nombre_abonnes,
                    nombre_abonnements,
                    nom_affichage,
                    biographie,
                    url_image_profil,
                    url_image_banniere,
                    autorisation) 
    
                VALUES (
                    ?, NOW(), ?, ?, ?, ?, 0, 0, ?, ?, ?, ?, ?);`,
                    [
                        userId,
                        nom,
                        prenom,
                        username,
                        email,
                        username,
                        'Je viens d\'arriver sur Klemn!',
                        'http://localhost:3000/default_profile_image.jpg',
                        'http://localhost:3000/default_banner_image.webp',
                        3
                    ],
                    function (err, results, fields) {
                        if (err) {
                            // logger.info("Erreur lors de lexecution de la query.", err)
                            console.log(err)
                            res.send(err)
                        }

                    }
                );
            }).catch((error) => {
                console.log(error)
                res.status(500).send("ERREUR: " + error.code)
            });
        } else {
            // Erreur de validation des donnees (Express-validator)
            // res.send({ errors: results.array() });
            res.send(resultatValidation)
        }
    });