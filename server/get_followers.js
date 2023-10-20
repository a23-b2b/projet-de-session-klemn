const express = require('express')
const app = express()
const mysql = require('mysql2')

const { logger } = require('./serveur.js')

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})


module.exports = app.post('/:user_id', (req, res) => {
    const userId = req.params.user_id

    mysqlConnection.query(`
                SELECT c.nom_affichage, c.nom_utilisateur, c.url_image_profil
                FROM compte c
                         JOIN compte_suivi cs ON c.id_compte = cs.compte
                WHERE cs.suit = ?;`,
        [userId],

        function (err, results) {
            if (err) {
                // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
                console.log(err)
                res.status(500).send('Erreur de base de données')
            }

            if (results) {
                res.status(200).send(results)
            }
        })
});