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


module.exports = app.get('/:offset', (req, res) => {
    const offset = parseInt(req.params.offset);
    const limit = 6

    mysqlConnection.query(`
            select post.*, c.nom_affichage, c.nom_utilisateur
            from post
            inner join compte c on post.id_compte = c.id_compte
            
            order by date_publication desc
            limit ? offset ?;
        `,
        [limit, offset],
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