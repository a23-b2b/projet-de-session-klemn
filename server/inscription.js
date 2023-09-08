const express = require('express')
const app = express()
const { check, body, validationResult  } = require('express-validator');
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
            `INSERT INTO compte (id_compte, date_creation_compte, nom, prenom, nom_utilisateur, courriel, telephone, autorisation_id_autorisation) 
            VALUES (?, NOW(), ?, ?, ?, ?, ?, ?);`,
            [id_compte, nom, prenom, username , email, telephone, 3], 
            function (err, results, fields) {
                if (err) {
                    logger.info("Erreur lors de lexecution de la query.", err)
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