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

// la valeur d'un vote, laisse la place a un Super vote qui vaudrait plus par exemple.
const voteStrength = 1;

function setPostScore(postId, type, score) {
    if (type === "like") {
        mysqlConnection.query(
            `UPDATE post 
            SET nombre_likes = nombre_likes + ? 
            WHERE id_post = ?;`,
            [score, postId],
            (err, results, fields) => {
                if (err) {
                    console.log(err)
                }
            })
    }

    if (type === "dislike") {
        mysqlConnection.query(
            `UPDATE post 
            SET nombre_dislikes = nombre_dislikes + ? 
            WHERE id_post = ?;`,
            [score, postId],
            (err, results, fields) => {
                if (err) {
                    console.log(err)
                }
            })
    }
}

module.exports = app.post('/:id_post/vote', (req, res) => {
    // TODO: express validator pour verifier que le score est valide (et pas 10000 points)
    const postId = req.params.id_post;
    const score = req.body.score;
    const idToken = req.headers.authorization

    admin.auth().verifyIdToken(idToken, true)
        .then((payload) => {

            const userId = payload.uid;

            if (!userId) return res.status(401).send(JSON.stringify({ 'erreur': 'Token invalide' }))

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
                        console.log(`${userId} voted ${score} on post ${postId}`)
                        mysqlConnection.query(
                            `INSERT INTO vote 
                            (id_compte, id_post, score) 
                            VALUES 
                            (?, ?, ?);`,
                            [userId, postId, score],
                            (err, results, fields) => {
                                if (!err) {
                                    if (score > 0) {
                                        setPostScore(postId, "like", voteStrength)
                                    }

                                    if (score < 0) {
                                        setPostScore(postId, "dislike", voteStrength)
                                    }

                                    res.status(200).send(JSON.stringify({
                                        postScoreDifference: score,
                                        currentUserVote: score
                                    }))
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
                            console.log(`${userId} cancelled their ${score} vote on post ${postId}`)

                            mysqlConnection.query(
                                `DELETE FROM vote 
                                WHERE id_compte = ? 
                                AND id_post = ?;`,
                                [userId, postId],
                                (err, results, fields) => {
                                    if (!err) {
                                        if (score > 0) {
                                            setPostScore(postId, "like", -voteStrength)
                                        }

                                        if (score < 0) {
                                            setPostScore(postId, "dislike", -voteStrength)
                                        }

                                        res.status(200).send(JSON.stringify({
                                            postScoreDifference: -score,
                                            currentUserVote: 0
                                        }))
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
                                        if (score > 0) {
                                            setPostScore(postId, "dislike", -voteStrength)
                                            setPostScore(postId, "like", voteStrength)
                                        }

                                        if (score < 0) {
                                            setPostScore(postId, "like", -voteStrength)
                                            setPostScore(postId, "dislike", voteStrength)
                                        }

                                        res.status(200).send(JSON.stringify({
                                            postScoreDifference: score * 2,
                                            currentUserVote: score
                                        }))
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