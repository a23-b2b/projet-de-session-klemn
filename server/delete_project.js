const express = require('express')
const mysql = require('mysql2')
const logger = require('./logger.js')
const app = express()

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
})

module.exports = app.post('/:id_projet', (req, res) => { 
    const id_projet = req.params.id_projet
    
    mysqlConnection.query(`
        DELETE FROM projet
            INNER JOIN demande_collab d ON projet.id_projet = d.projet_id_projet
            INNER JOIN collaborateur c ON projet.id_projet = c.projet_id_projet
            INNER JOIN post_collab b ON projet.id_projet = b.projet_id_projet
            INNER JOIN post p ON b.post_id_post = p.id_post
            WHERE projet.id_projet = ? ;`, 
            // Vive les bases de donnees relationnelles
        [id_projet],
        function(err) {
            if (err) {
                const errJSON = JSON.stringify(err)
                res.status(500).send()
                logger.info(JSON.stringify(errJSON))
            } else {
                res.status(200).send()
            } 
            
        })
})
