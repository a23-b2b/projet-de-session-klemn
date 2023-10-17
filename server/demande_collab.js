const express = require('express')
const app = express()
const mysql = require('mysql2')
const { admin } = require('./serveur.js')
const { logger } = require('./logger.js');


const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

module.exports = app.post('/p/:id_post_collab/:id_compte_collaborateur', (req, res) => {
    const idToken = req.body.firebase_id_token;

    const id_post_collab = req.params.id_post_collab;
    const id_collaborateur = req.params.id_compte_collaborateur;

    admin.auth().verifyIdToken(idToken, true)
        .then((payload) => {
            mysqlConnection.query(
                `INSERT INTO demande_collab 
                    (id_demande_collab, est_accepte, post_collab_id_collab, compte_id_compte)
                VALUES
                    (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), false, ?, ?);`, 
                    [id_post_collab, id_collaborateur], 
                    function (err, results, fields) {
                        if (err) {
                            res.status(500).send();
                        } else {
                            res.status(200);
                        }
                    });
        }).catch((error) => {
            res.status(500).send("ERREUR: " + error.code)
        })
});