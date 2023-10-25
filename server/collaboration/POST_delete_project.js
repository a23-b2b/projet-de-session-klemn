const express = require('express')
const logger = require('../logger.js')
const app = express()
const { pool } = require('../serveur.js')

module.exports = app.post('/:id_projet', (req, res) => { 
    const id_projet = req.params.id_projet
    admin.auth().verifyIdToken(idToken, true).then((payload) => {
    pool.query(`
        DELETE FROM projet WHERE projet.id_projet = ? ;`, 
        [id_projet],
        function(err) {
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
