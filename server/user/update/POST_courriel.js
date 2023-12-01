const express = require('express')
const app = express()
const { admin } = require('../../serveur.js')
const { logger } = require('../../logger.js')
const { pool } = require('../../serveur.js')


module.exports = app.post('/update/courriel', (req, res) => {
    const userToken = req.headers.authorization;
    const newEmail = req.body.new_email;

    admin.auth().verifyIdToken(userToken, true).then((payload) => {
        const userId = payload.uid;
        admin.auth().getUser(userId).then((userRecord) => {
            const previousEmail = userRecord.email;
            admin.auth().updateUser(userId, {email: newEmail}).then(() => {
                pool.query(
                    `UPDATE compte SET courriel = ? WHERE id_compte = ?`,
                    [newEmail, userId],
                    function (err, results) {
                        if (err) {
                            logger.info(`Erreur lors de lexecution de la query POST courriel: ${err.code}`)

                            admin.auth().updateUser(userId, {email: previousEmail})
                            res.status(500).send('Erreur de base de données')
                        }
                        if (results) {
                            admin.auth().createCustomToken(userId).then((token) => {
                                res.status(200).json(token)
                            }).catch(() => {
                                res.status(500).send('Erreur de base de données')
                            })
                        }
                    });
            })
        })
    }).catch((error) => {
        res.status(500).send('Erreur de base de données')
    })
});
