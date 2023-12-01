const express = require('express')
const logger = require('../logger.js')
const app = express()
const { pool, admin } = require('../serveur.js')


const STATUT_OUVERT = 'true';

module.exports = app.post('/:id_projet/:statut', (req, res) => {
    const id_projet = req.params.id_projet
    const statut = req.params.statut
    const est_ouvert = (statut === STATUT_OUVERT)
    const idToken = req.headers.authorization;

    admin.auth().verifyIdToken(idToken, true).then((payload) => {
        const userId = payload.uid;

        pool.query(`
        UPDATE projet 
            SET projet.est_ouvert = ? 
            WHERE projet.id_projet = ? 
            AND compte_id_proprio = ?;`,
            [est_ouvert, id_projet, userId],
            function (err) {
                if (err) {
                    const errJSON = JSON.stringify(err)
                    res.status(500).send()
                    logger.info(JSON.stringify(errJSON))
                } else {
                    res.status(200).send()
                }

            })
    }).catch((error) => {
        res.status(500).send("ERREUR: " + error.code)
    })
})
