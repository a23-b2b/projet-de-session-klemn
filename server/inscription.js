const express = require('express')
const app = express()
const mysql = require('mysql2')
const { check, body, validationResult  } = require('express-validator');

// import { logger } from './serveur.js'
const { logger } = require('./serveur.js')
// Utilisation pour encryption du mot de passe

const connexion = mysql.createConnection({
    host: 'localhost',
    port: '32769',
    user: 'root',
    password: 'root',
    database: 'dev'
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

        connexion.query(
            `INSERT INTO compte (id_compte, date_creation_compte, nom, prenom, nom_utilisateur, courriel, telephone, autorisation_id_autorisation) 
            VALUES (?, NOW(), ?, ?, ?, ?, ?, ?);`,
            [id_compte, nom, prenom, username , email, telephone, "3"], 
            function (err, results, fields) {
                if (err) {
                    console.log("Erreur lors de lexecution de la query.", err)
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