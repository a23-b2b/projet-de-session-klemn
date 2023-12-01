const express = require('express')
const { pool } = require('../../../serveur.js')
const { admin } = require('../../../serveur.js')
const { logger } = require('../../../logger.js')

const app = express()

module.exports = app.get('/:id_post/edit/history', (req, res) => {
    const postId = req.params.id_post;
    const idToken = req.headers.authorization;

    admin.auth().verifyIdToken(idToken, true).then((payload) => {
        const userId = payload.uid;

        // logger.log("info", `[/post/:id_post/edit/history] User ${userId} (${payload.email}) requested edit history of post "${postId}"`)

        pool.query(`
            SELECT * FROM post_edit 
            WHERE id_post = ? 
            ORDER BY date_modification DESC;`,
            [postId],
            function (err, results, fields) {
                if (err) {
                    console.log(err)
                    logger.log("error", err)
                    res.status(500).send("ERREUR: " + err.code)
                } 
                
                if (results[0] === 0) {
                    res.send(JSON.stringify({ "erreur": "aucun historique de modification" }))
                } else {
                    res.status(200).send(results)
                }
            }
        );
    }).catch((error) => {
        res.status(500).send("ERREUR" + error.code)
    });
})