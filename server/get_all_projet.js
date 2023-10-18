const express = require('express')
const app = express()
const mysql = require('mysql2')
const logger = require('./logger.js')

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

module.exports = app.get('/:compte_id_proprio', (req, res) => { 
    const id_proprio = req.params.compte_id_proprio
    
    // Si accepted, faire update true + insert collaborateur
    // Sinon, faire update false
    
    mysqlConnection.query(`
        SELECT compte_id_proprio, id_projet, titre_projet, description_projet, est_ouvert
            FROM projet
            WHERE compte_id_proprio = ? ;`, 
        [id_proprio],
        function(err, results) {
            if (err) {
                res.status(500).send()
                logger.info(JSON.stringify(err))
            } else if (results) {
                res.send(results)
            } 
            
        })
})