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
    // select ses projet
    mysqlConnection.query(`
        SELECT compte.id_compte, compte.url_image_profil p.id_projet, p.titre, p.description
        FROM compte 
        LEFT JOIN demande_collab d ON compte.id_compte = d.id_collaborateur`, 
        [],
        function(err, results, fields) {

        })
})