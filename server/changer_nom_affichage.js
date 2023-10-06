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


module.exports = app.post('/', [], (req, res) => {
    const resultatValidation = validationResult(req);


    const id_compte = req.body.id_compte;
    const newNameAffichage = req.body.new_name_affichage;

    mysqlConnection.query(
        `UPDATE compte SET nom_affichage = ? WHERE id_compte = ?`,
        [newNameAffichage, id_compte],
        function (err, results) {
            if (err) {
                // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
                res.status(500).send('Erreur de base de données', err)
            }
            if (results) {
                res.status(200).send(results)
            }
        });
});
