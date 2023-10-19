const express = require('express')
const app = express()
const { check, body, validationResult } = require('express-validator');
const mysql = require('mysql2')
const { admin } = require('../../serveur.js')
const { logger } = require('../../serveur.js')

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})


module.exports = app.post('/update/prenom', [], (req, res) => {
    const resultatValidation = validationResult(req);

    const userToken = req.headers.authorization;
    const newPrenom = req.body.new_prenom;

    admin.auth().verifyIdToken(userToken, true).then((payload) => {
        const userId = payload.uid;

        mysqlConnection.query(
            `UPDATE compte SET prenom = ? WHERE id_compte = ?`,
            [newPrenom, userId],
            function (err, results) {
                if (err) {
                    // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
                    res.status(500).send('Erreur de base de données', err)
                }
                if (results) {
                    res.status(200).send(results)
                }
            });
    }).catch((error) => {
        res.status(500).send('Erreur de base de données', error)
    })
});
