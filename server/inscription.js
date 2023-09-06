const express = require('express')
const app = express()
const mysql = require('mysql2')
const validator = require('express-validator')

const firebase = require('firebase')

import { getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
const provider = new GoogleAuthProvider();

// TODO: Utiliser l'objet de log au lieu de console.log(); et valider autorisation avant insertion

// Utilisation pour encryption du mot de passe
const sel = 10

const connexion = mysql.createConnection({
    host: 'localhost',
    port: '32769',
    user: 'root',
    password: 'root',
    database: 'test'
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
            `INSERT INTO COMPTE (id_compte, heure_creation_compte, nom, prenom, nom_utilisateur, courriel, telephone, autorisation_id_autorisation) 
            VALUES (?, SYSDATE, ?, ?, ?, ?, ?, ?, ?);`,
            [id_compte, nom, prenom, username , email, telephone, 3], 
            function (err, results, fields) {
                if (err) Logger.info(err + '; Erreur query.')
            }
        );

        res.status(200).send('ABOUT From about.js file')
    } else {
        // Erreur de validation des donnees (Express-validator)
        res.send({ errors: result.array() });
    }
});