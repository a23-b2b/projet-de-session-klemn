const express = require('express')
const { body, validationResult } = require('express-validator');
const { pool } = require('../../serveur.js')
const { admin } = require('../../serveur.js')

const app = express()

module.exports = app.delete('/:id_post', [body('contenu').notEmpty().isLength({ max: 4000 })], (req, res) => {
    const resultatValidation = validationResult(req);
    if (resultatValidation.isEmpty()) {

        const postToDeleteId = req.params.id_post;
        const idToken = req.headers.authorization;

        admin.auth().verifyIdToken(idToken, true).then((payload) => {

            const userId = payload.uid;

            pool.query(
                `DELETE FROM vote
                 WHERE id_post = ?;`,
                [userId],
                function (err, results, fields) {
                    if (err) {
                        // logger.info("Erreur lors de lexecution de la query.", err)
                        console.log(err)
                        res.status(500).send("ERREUR: " + err.code)

                    } else {
                        res.send()
                    }
                }
            );


        }).catch((error) => {
            res.status(500).send("ERREUR: " + error.code)
        });

    } else {
        // Erreur de validation des donnees (Express-validator)
        res.send(JSON.stringify(resultatValidation))
    }
})