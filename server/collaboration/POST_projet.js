const express = require('express')
const mysql = require('mysql2')
const logger = require('../logger.js')
const app = express()
const { pool } = require('../serveur.js')
const { body, validationResult } = require('express-validator');

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
})

const query = 
     `
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
        false)
    ;`

// TODO: admin.auth().verifyIdToken(idToken, true).then((payload) => {
// TODO: chaine de validation avec const { body, validationResult } = require('express-validator');
module.exports = app.post('/add/', 
    [body('titre_projet').notEmpty().isLength({ max: 4000 })], (req, res) => { 
        
        const titre_projet = req.body.titre_projet
        const description_projet = req.body.description_projet
        const url_repo_git = req.body.url_repo_git
        const compte_id_proprio = req.body.compte_id_proprio

        logger.info(`Creation d'un nouveau projet: ${titre_projet}`)

        pool.query(
            query,
            [titre_projet,
            description_projet,
            url_repo_git,
            compte_id_proprio],
            function(err) {
                if (err) {
                    res.status(500).send()
                    logger.info(JSON.stringify(err.toString()))
                } else {
                    res.status(200).send()
                } 
        })
})
