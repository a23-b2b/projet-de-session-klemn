const express = require('express')
const app = express()
const mysql = require('mysql2')
const { admin } = require('./serveur.js')
const { logger } = require('./serveur.js')

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})


module.exports = app.get('/feed/:offset', (req, res) => {
    const offset = parseInt(req.params.offset);
    const userToken = req.headers.authorization;
    const limit = 6


    admin.auth().verifyIdToken(userToken, true).then((payload) => {
        const userId = payload.uid

        console.log(userId)

        mysqlConnection.query(`
            select post.*, c.nom_affichage, c.nom_utilisateur, c.url_image_profil, v.score as vote
            from post
            left join vote v on post.id_post = v.id_post and v.id_compte = ?
            inner join compte c on post.id_compte = c.id_compte
            where id_type_post != 4
            order by date_publication desc
            limit ? offset ?;`,
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
    })
        .catch((error) => {
            return res.status(500).send("ERREUR: " + error.code)
        });
});