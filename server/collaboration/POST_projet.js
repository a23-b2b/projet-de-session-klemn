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

const sql = {
    query: `
    INSERT INTO projet 
        (id_projet, 
        titre_projet, 
        description_projet, 
        url_repo_git, 
        compte_id_proprio, 
        est_ouvert)
    VALUES
        (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), 
        ?, 
        ?,
        ?, 
        ?, 
        ?,)
    ;`
}
TODO: // admin.auth().verifyIdToken(idToken, true).then((payload) => {

module.exports = app.post('/add', (req, res) => { 
    const projet = req.body.description_projet
    const titre_projet = req.body.titre_projet
    logger.info(`Creation d'un nouveau projet: ${titre_projet}`)
    
    pool.query(
        sql.query
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
