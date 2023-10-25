const express = require('express')
const app = express()
const { check, body, validationResult } = require('express-validator');
const { pool } = require('../serveur.js')
const { admin } = require('../serveur.js')


module.exports = app.post('/create',
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
            .isLength({ min: 1, max: 254 })
            .withMessage("Le prénom doit contenir entre 1 et 254 caractères."),
        body('nom')
            .notEmpty()
            .withMessage('Le nom ne peut pas être vide.')
            .isLength({ min: 1, max: 254 })
            .withMessage("Le nom doit contenir entre 1 et 254 caractères."),
    ], (req, res) => {
        const resultatValidation = validationResult(req);
        if (resultatValidation.isEmpty()) {

            const username = req.body.username;
            const prenom = req.body.prenom;
            const nom = req.body.nom;
            const email = req.body.email;
            const password = req.body.password;

            admin.auth().createUser({
                email: email,
                password: password,
                disabled: false,
            }).then((user) => {
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
                        user.uid,
                        nom,
                        prenom,
                        username,
                        user.email,
                        username,
                        'Je viens d\'arriver sur Klemn!',
                        'https://firebasestorage.googleapis.com/v0/b/klemn-702af.appspot.com/o/profil%2Fdefault.jpg?alt=media&token=40dc04ca-5a18-46cd-8519-425fd4855a33',
                        'https://firebasestorage.googleapis.com/v0/b/klemn-702af.appspot.com/o/bannieres%2Fbanniere%20klemn2.webp?alt=media&token=b70ae459-52c2-4d30-8fd4-7aa12725e3e9',
                        3
                    ],
                    function (err, results, fields) {
                        if (err) {
                            // logger.info("Erreur lors de lexecution de la query.", err)
                            console.log(err)

                            // supprimer le compte de firebase
                            admin.auth().deleteUser(user.uid);

                            res.status(500).send(err)
                        }

                        else {
                            res.status(201).send({
                                "succes" : "Compte créé avec succès.",
                                "username": username,
                                "userId": user.uid
                            })
                        }
                    }
                );
            }).catch((error) => {
                res.status(500).send(error)
            });

        } else {
            // Erreur de validation des donnees (Express-validator)
            // res.send({ errors: results.array() });
            res.send(resultatValidation)
        }
    });