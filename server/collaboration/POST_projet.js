const express = require('express')
const mysql = require('mysql2')
const logger = require('../logger.js')
const app = express()
const { pool } = require('../../serveur.js')

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
})

module.exports = app.post('/add', (req, res) => { 
    const id_projet = req.params.id_projet
    
    pool.query(`
        DELETE FROM projet WHERE projet.id_projet = ? ;`, 
        [id_projet],
        function(err) {
            if (err) {
                const errJSON = JSON.stringify(err)
                res.status(500).send()
                logger.info(JSON.stringify(errJSON))
            } else {
                res.status(200)
            } 
            
        })
})
