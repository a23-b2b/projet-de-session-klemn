const express = require('express')
const { body, validationResult } = require('express-validator');
const mysql = require('mysql2')
const crypto = require('crypto')
const { logger } = require('./serveur.js')
const { admin } = require('./serveur.js')

const app = express()


const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
})


module.exports = app.post('/', (req, res) => {
    const userId = req.body.user_id;
    const postId = req.body.post_id;
    const score = req.body.score;
    const idToken = req.body.firebase_id_token

    admin.auth().verifyIdToken(idToken, true)
        .then((payload) => {

            mysqlConnection.query(
                `SELECT score 
                FROM vote 
                WHERE id_compte=?
                AND id_post=?`,
                [userId, postId],
                function (err, results, fields) {
                    
                    if (err) {
                        // logger.info("Erreur lors de lexecution de la query.", err)
                        console.log(err)
                        res.status(500).send("ERREUR: " + err.code)
                    }

                    // L'utilisateur n'a pas de vote associe au post
                    if (!results[0]) {
                        mysqlConnection.query(
                            `INSERT INTO vote 
                            (id_compte, id_post, score) 
                            VALUES 
                            (?, ?, ?);`,
                            [userId, postId, score],
                            (err, results, fields) => {
                                if (!err) {
                                    res.status(200).send("")
                                }

                                if (err) {
                                    console.log(err)
                                    res.sendStatus(500)
                                }
                            })
                    }

                    // L'utilisateur a deja un vote sur le post
                    if (results[0]) {
                        // si le nouveau score est le meme que celui qui existe, on le supprime
                        if (results[0]["score"] == score) {
                            mysqlConnection.query(
                                `DELETE FROM vote 
                                WHERE id_compte = ? 
                                AND id_post = ?;`,
                                [userId, postId],
                                (err, results, fields) => {
                                    if (!err) {
                                        res.status(200).send("Vote supprimé.")
                                    }

                                    if (err) {
                                        console.log(err)
                                        res.sendStatus(500)
                                    }
                                })
                        // Le score est different, alors on modifie le score
                        } else {
                            mysqlConnection.query(
                                `UPDATE vote 
                                SET score = ? 
                                WHERE id_compte = ? 
                                AND id_post = ?;`,
                                [score, userId, postId],
                                (err, results, fields) => {
                                    if (!err) {
                                        res.status(200).send("Vote changé.")
                                    }

                                    if (err) {
                                        console.log(err)
                                        res.sendStatus(500)
                                    }
                                })
                        }
                    }
                }
            );
        })

        .catch((error) => {
            return res.status(500).send("ERREUR: " + error.code)
        });

})