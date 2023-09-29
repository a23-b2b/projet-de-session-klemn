const express = require('express')
const app = express()
const { check, body, validationResult } = require('express-validator');
const mysql = require('mysql2')

const { logger } = require('./serveur.js')

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})


module.exports = app.post('/', [body('username').notEmpty(), body('email').optional().trim().isEmail()], (req, res) => {
    const resultatValidation = validationResult(req);
    if (resultatValidation.isEmpty()) {

        const id_compte = req.body.id_compte;
        const username = req.body.username;
        const email = req.body.email;
        const prenom = req.body.prenom;
        const nom = req.body.nom;
        const telephone = req.body.telephone;

        mysqlConnection.query(
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
                autorisation_id_autorisation) 

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
                3
            ],
            function (err, results, fields) {
                if (err) {
                    // logger.info("Erreur lors de lexecution de la query.", err)
                    if (err.code === 'ER_DUP_ENTRY') {
                        res.status(401).send(JSON.stringify({
                            message: "Le compte existe déjà.",
                            username: username,
                            code: "ERR_USERNAME_TAKEN"
                        }))
                    } else {
                        res.status(500).send("Erreur de base de donn/es")
                    }
                }

                if (!err && results) {
                    res.status(200).send("Compte enregistre")
                }
            }
        );
    } else {
        // Erreur de validation des donnees (Express-validator)
        // res.send({ errors: results.array() });
        res.send(JSON.stringify(resultatValidation))
    }
});