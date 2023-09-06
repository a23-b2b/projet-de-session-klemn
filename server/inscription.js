const express = require('express')
const app = express()
const mysql = require('mysql2')
const validator = require('express-validator')
const bcrypt = require('bcrypt')

// TODO: Utiliser l'objet de log au lieu de console.log(); et valider autorisation avant insertion

import { logger } from './serveur.js'

// Utilisation pour encryption du mot de passe
const sel = 10

const connexion = mysql.createConnection({
    host: 'localhost',
    port: '32769',
    user: 'root',
    password: 'root',
    database: 'test'
})

module.exports = app.post('/', [body('username').notEmpty(), body('password').notEmpty(), body('email').optional().trim().isEmail()], (req, res) => {
    const resultatValidation = validationResult(req);
    if (resultatValidation.isEmpty()) {
        /*
        const date = new Date();
        const formatted_date = date.toISOString();
        console.log(formatted_date);
        */

        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const prenom = req.body.prenom;
        const nom = req.body.nom;
        const telephone = req.body.telephone;
      

        connexion.query(
            `INSERT INTO COMPTE (heure_creation_compte, nom, prenom, nom_utilisateur, mot_de_passe, courriel, telephone, autorisation_id_autorisation) 
            VALUES (SYSDATE, ?, ?, ?, ?, ?, ?, ?);`,
            [nom, prenom, username, mot_de_passe_hash, email, telephone, 3], 
            function (err, results, fields) {
                if (err) {
                    logger.info("Erreur lors de lexecution de la query.")
                } 
            }
        );

        res.status(200).send('ABOUT From about.js file')
    } else {
        // Erreur de validation des donnees (Express-validator)
        res.send({ errors: result.array() });
    }
});