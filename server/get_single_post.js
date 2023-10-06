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
    const userId = req.headers.authorization

    console.log(userId)

    mysqlConnection.query(`
        select post.*, c.nom_affichage, c.nom_utilisateur, c.url_image_profil, v.score as vote
        from post
        left join vote v on post.id_post = v.id_post and v.id_compte = ?
        inner join compte c on post.id_compte = c.id_compte
        where post.id_post like ?;
    `,
        [userId, req.params.post_id],
        function (err, results, fields) {
            if (err) {
                console.log(err)
                // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
                res.status(500).send('Erreur de base de données', err)
            }
            if (results) {
                res.status(200).send(results)
            }
        })
});