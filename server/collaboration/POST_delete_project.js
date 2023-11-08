const express = require('express')
const logger = require('../logger.js')
const app = express()
const { pool, admin } = require('../serveur.js')

module.exports = app.post('/:id_projet', (req, res) => {
    const id_projet = req.params.id_projet
    const idToken = req.headers.authorization;

    admin.auth().verifyIdToken(idToken, true).then((payload) => {
        const userId = payload.uid;

        pool.query(`
        DELETE FROM projet WHERE projet.id_projet = ? AND compte_id_proprio = ?;`,
            [id_projet, userId],
            function (err) {
                if (err) {
                    const errJSON = JSON.stringify(err)
                    res.status(500).send()
                    logger.info(JSON.stringify(errJSON))
                } else {
                    res.status(200)
                }
            })
    }).catch((error) => {
        res.status(500).send("ERREUR: " + error.code)
    });
})
