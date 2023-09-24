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
    const userId = req.body.user_id

    mysqlConnection.query(`
        SELECT * FROM post inner join compte_suivi cs on post.id_compte = cs.suit WHERE compte LIKE ?
        
        order by date_publication desc
        limit ? offset ?;`,
        [userId, limit, offset],
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