const express = require('express')
const app = express()
const { check, body, validationResult } = require('express-validator');
const { pool } = require('./serveur.js')


module.exports = app.post('/', [body('username').notEmpty(), body('email').optional().trim().isEmail()], (req, res) => {
    const resultatValidation = validationResult(req);
    if (resultatValidation.isEmpty()) {

        const id_compte = req.body.id_compte;
        const username = req.body.username;
        const email = req.body.email;
        const prenom = req.body.prenom;
        const nom = req.body.nom;
        const telephone = req.body.telephone;

        pool.query(
            `INSERT INTO compte (
                id_compte, 
                date_creation_compte, 
                nom, 
                prenom, 
                nom_utilisateur, 
                courriel, 
                telephone,
                nombre_abonnes,
                nombre_abonnements,
                nom_affichage,
                biographie,
                url_image_profil,
                url_image_banniere,
                autorisation) 

            VALUES (
                ?, NOW(), ?, ?, ?, ?, ?, 0, 0, ?, ?, ?, ?, ?);`,
            [
                id_compte,
                nom,
                prenom,
                username,
                email,
                telephone,
                `${prenom} ${nom}`,
                'Je viens d\'arriver sur Klemn!',
                'http://localhost:3000/default_profile_image.jpg',
                'http://localhost:3000/default_banner_image.webp',
                'pre_made_set_2'
            ],
            function (err, results, fields) {
                if (err) {
                    // logger.info("Erreur lors de lexecution de la query.", err)
                    console.log(err)
                    res.send(JSON.stringify(err))
                }

            }
        );

        res.status(200).send('ABOUT From about.js file')
    } else {
        // Erreur de validation des donnees (Express-validator)
        // res.send({ errors: results.array() });
        res.send(JSON.stringify(resultatValidation))
    }
});