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

console.log("vous etes ici")
module.exports = app.post('/', (req, res) => {
    const username = req.body.username;
    const id_titre = req.body.id_titre
    console.log(id_titre)

    mysqlConnection.query(`
    Delete from post
    where id_post= ?`,
        [id_titre],



        function (err, results, fields) {
            if (err) {
                // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
                console.log(err)
                res.status(500).send('Erreur de base de données', err)
            }



            if (results) {
                res.status(200).send(id_post)
            }
        })
});