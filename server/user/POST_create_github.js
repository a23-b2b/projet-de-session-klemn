const express = require('express')
const app = express()
const { check, body, validationResult } = require('express-validator');
const { pool } = require('../serveur.js')
const { admin } = require('../serveur.js')
const logger = require('../logger.js');
const e = require('express');


module.exports = app.post('/create-github',
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
            const id_github = req.body.github_id
            const id_compte = req.body.id_compte

            logger.info(JSON.stringify(req.body))


            pool.query(
                `INSERT INTO compte (
                        id_compte,
                        id_github, 
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
                        ?,
                        ?, 
                        NOW(), 
                        ?, 
                        ?, 
                        ?, 
                        ?, 
                        0, 
                        0, 
                        ?, 
                        'Je viens d arriver sur Klemn!',
                        'https://firebasestorage.googleapis.com/v0/b/klemn-702af.appspot.com/o/profil%2Fdefault.jpg?alt=media&token=40dc04ca-5a18-46cd-8519-425fd4855a33',
                        'https://firebasestorage.googleapis.com/v0/b/klemn-702af.appspot.com/o/bannieres%2Fbanniere%20klemn2.webp?alt=media&token=b70ae459-52c2-4d30-8fd4-7aa12725e3e9', 
                        3);`,
                [
                    id_compte,
                    id_github,
                    nom,
                    prenom,
                    username,
                    email,
                    username
                ],
                function (err, results, fields) {
                    if (err) {
                        logger.info(`IP ${req.ip}: Erreur lors de la création du compte sur MySQL: ${err}`)

                        // supprimer le compte de firebase
                        admin.auth().deleteUser(id_compte);

                        res.status(500).send(err)
                    }

                    else {
                        logger.log("info", `IP ${req.ip}: compte créé avec succès: ${user.uid}`)
                        res.status(201).send({
                            "succes": "Compte créé avec succès.",
                            "username": username,
                            "userId": id_compte
                        })
                    }
                }
            );


        } else {
            logger.log("info", `IP ${req.ip} à tenté de créer un compte mais à entré des données invalides: ${JSON.stringify(resultatValidation)}`)
            res.send(resultatValidation)
        }
    });