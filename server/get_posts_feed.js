const express = require('express')
const app = express()
const mysql = require('mysql2')
const { logger } = require('./logger.js')
const { pool } = require('../../serveur.js')

{/*const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})*/}


module.exports = app.post('/', (req, res) => {
    const offset = parseInt(req.body.offset);
    const userId = req.body.user_id
    const limit = 6

    console.log(userId)

    pool.query(`
        SELECT post.*, u.nom_affichage, u.nom_utilisateur, u.url_image_profil, c.projet_id_projet, p.est_ouvert, q.est_resolu, q.post_meilleure_reponse 
        FROM post
        INNER JOIN compte u on post.id_compte = u.id_compte
        LEFT JOIN post_collab c ON post.id_post = c.post_id_post
        LEFT JOIN post_question q ON post.id_post = q.post_id_post
        INNER JOIN projet p ON c.projet_id_projet = p.id_projet
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