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
    const limit = 6
    const userId = req.body.user_id;

    console.log(userId)

    mysqlConnection.query(`
        SELECT * , v.score as vote
        from post
        left join vote v on post.id_post = v.id_post and v.id_compte = ? 
        inner join compte c on post.id_compte = c.id_compte
        inner join compte_suivi cs on post.id_compte = cs.suit 
        WHERE compte LIKE ? AND id_type_post != 4
        order by date_publication desc
        limit ? offset ?;`,
        [userId, userId, limit, offset],
        function (err, results, fields) {
            if (err) {
                // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
                res.status(500)
            }
            if (results) {
                console.log(results)
                res.status(200).send(results)
            }
        })
});