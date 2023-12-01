const express = require('express')
const app = express()
const { check, body, validationResult } = require('express-validator');
const mysql = require('mysql2')
const { admin } = require('../../serveur.js')
const { logger } = require('../../logger.js')
const { pool } = require('../../serveur.js')


module.exports = app.post('/update/display_name', [], (req, res) => {

    const userToken = req.headers.authorization;
    const newDisplayName = req.body.new_name_affichage;

    admin.auth().verifyIdToken(userToken, true).then((payload) => {
        const userId = payload.uid;

        pool.query(
            `UPDATE compte SET nom_affichage = ? WHERE id_compte = ?`,
            [newDisplayName, userId],
            function (err, results) {
                if (err) {
                    logger.info(`Erreur lors de lexecution de la query POST display_name: ${err.code}`)
                    res.status(500).send('Erreur de base de données', err)
                }
                if (results) {
                    res.status(200).send(results)
                }
            });
    }).catch((error) => {
        res.status(500).send('Erreur de base de données', error)
    })
});
