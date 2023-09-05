const express = require('express')
const app = express()
const mysql = require('mysql2')

const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
})

module.exports = app.get('/', (req, res) => {
    const date = new Date();
    const formatted_date = date.toISOString();
    console.log(formatted_date);

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const prenom = req.body.prenom;
    const nom = req.body.nom;
    const telephone = req.body.telephone;

    connexion.query(
        `INSERT INTO COMPTE (heure_creation_compte, nom, prenom, nom_utilisateur, mot_de_passe, courriel, telephone, autorisation_id_autorisation) 
        VALUES (SYSDATE, ?, ?, ?, ?, ?, ?, ?);`,
        [nom, prenom, username, password, email, telephone, 3], 
        function (err, results, fields) {
            if (err) console.log(err);
        }
    );
    res.status(200).send('ABOUT From about.js file')
});