const express = require('express')
const app = express()
const { admin } = require('../serveur.js')
const logger = require('../logger.js');
const { pool } = require('../../serveur.js')


module.exports = app.post('/:id_projet', (req, res) => {
    const idToken = req.body.firebase_id_token;

    const id_projet = req.params.id_projet;

    admin.auth().verifyIdToken(idToken, true).then((payload) => {
        const userId = payload.uid;

        pool.query(
            `INSERT INTO demande_collab 
                (id_demande_collab, est_accepte, projet_id_projet, compte_id_compte)
            VALUES
                (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), null, ?, ?);`,
            [id_projet, userId],
            function (err, results, fields) {
                if (err) {
                    res.status(500).send();
                } else {
                    res.status(200).send();
                }
            }
        )
    }).catch((error) => {
        res.status(500).send("ERREUR: " + error.code)
    })
});