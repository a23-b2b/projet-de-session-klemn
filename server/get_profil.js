const express = require('express')
const app = express()
const mysql = require('mysql2')

const { logger } = require('./serveur.js')

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})


module.exports = app.get('/:username', (req, res) => {
    console.log(req.params)
    mysqlConnection.query('SELECT id_compte, date_creation_compte, nom, prenom, nom_utilisateur, nom_affichage, nombre_abonnes, nombre_abonnements, biographie, url_image_profil, url_image_banniere FROM compte WHERE ? LIKE nom_utilisateur', 
    [req.params.username],
    function (err, results, fields) {
        if (err) {
            // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
            res.status(500).send('Erreur de base de données', err)
        }
        if (results) {
            res.status(200).send(results)
        }
    })
});