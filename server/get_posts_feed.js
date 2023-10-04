const express = require('express')
const app = express()
const mysql = require('mysql2')

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})


module.exports = app.get('/:offset', (req, res) => {
    const offset = parseInt(req.params.offset);
    const limit = 6

    mysqlConnection.query(`
            SELECT post.*, c.id_compte, c.nom_affichage, c.nom_utilisateur, c.url_image_profil, p.url_git, p.est_ouvert, p.id_collab, q.est_resolu, q.post_meilleure_reponse 
            FROM post
            LEFT JOIN compte c on post.id_compte = c.id_compte
            LEFT JOIN post_collab p ON post.id_post = p.post_id_post
            LEFT JOIN post_question q ON post.id_post = q.post_id_post
            where id_type_post != 4
            order by date_publication desc
            limit ? offset ?;
        `,
        [limit, offset],
        function (err, results, fields) {
            if (err) {
                res.status(500)
            }
            if (results) {
                res.status(200).send(results)
            }
        })
});