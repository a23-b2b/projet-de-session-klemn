const express = require('express')
const { body, validationResult } = require('express-validator');
const { pool } = require('../serveur.js')
const { admin } = require('../serveur.js')
const { logger } = require('../logger.js')

const app = express()

module.exports = app.post('/:id_question', (req, res) => {
    const idToken = req.headers.authorization;
    const id_question = req.params.id_question;
    const id_reponse = req.body.id_reply;

    admin.auth().verifyIdToken(idToken, true).then((payload) => {
        const userId = payload.uid;
        pool.query(
            `UPDATE post_question
                SET est_resolu = true, 
                    post_meilleure_reponse = ?
                WHERE post_id_post = ? ;`,
            [id_reponse, id_question],
            function (err, results, fields) {
                if (err) {
                    logger.info(err.code)
                    res.status(500).send(`ERREUR: ${err.code}`)
                } else {
                    res.status(200).send(fields)
                }
            }
        );

    }).catch((error) => {
        res.status(500).send("ERREUR: " + JSON.stringify(error))
    });


})