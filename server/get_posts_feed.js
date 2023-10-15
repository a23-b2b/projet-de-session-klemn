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


module.exports = app.post('/', (req, res) => {
    const offset = parseInt(req.body.offset);
    const userId = req.body.user_id
    const limit = 6

    console.log(userId)

    mysqlConnection.query(`
            select post.*, c.nom_affichage, c.nom_utilisateur, c.url_image_profil, v.score as vote, post_partage.id_shared_post, post_partage.is_quoted_post
            from post
            left join vote v on post.id_post = v.id_post and v.id_compte = ?
            left join post_partage on post.id_post = post_partage.id_post_original
            inner join compte c on post.id_compte = c.id_compte
            where id_type_post != 4
            order by date_publication desc
            limit ? offset ?;
        `,
        [userId, limit, offset],
        function (err, results, fields) {
            if (err) {
                // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
                res.status(500)
            }
            if (results) {
                // console.log(results)
                res.status(200).send(results)
            }
        })
});