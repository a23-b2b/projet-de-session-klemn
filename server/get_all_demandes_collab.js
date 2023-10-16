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

module.exports = app.get('/:id_compte', (req, res) => {
    const id_compte = req.params.id_compte
    
    mysqlConnection.query(`
        SELECT compte.id_compte, compte.url_image_profil, p.id_projet, p.titre, d.id_demande_collab
        FROM compte 
        INNER JOIN projet p ON compte.id_compte = p.id_compte_id_proprio
        LEFT JOIN demande_collab d ON p.id_projet = d.post_collab_id_collab
        WHERE p.id_compte_id_proprio = ? ;`, 
        [id_compte],
        function(err, results, fields) {
            res.send(results)
            console.log(results.toString())
        })
})