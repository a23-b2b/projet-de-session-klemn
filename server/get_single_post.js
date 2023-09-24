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


module.exports = app.get('/:post_id', (req, res) => {
    console.log(req.params)
    mysqlConnection.query(`
        select post.*, c.nom_affichage, c.nom_utilisateur, c.url_image_profil
        from post
        inner join compte c on post.id_compte = c.id_compte
        where id_post like ?;
    `,
        [req.params.post_id],
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