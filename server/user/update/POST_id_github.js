const express = require('express')
const app = express()
const { check, body, validationResult } = require('express-validator');
const mysql = require('mysql2')
const { admin } = require('../../serveur.js')
const { logger } = require('../../logger.js')
const { pool } = require('../../serveur.js')
const { GithubAuthProvider, getAuth, linkWithPopup } = require('firebase/auth')

module.exports = app.post('/sync-github', (req, res) => {
    const userToken = req.headers.authorization;
    const id_github = req.body.id_github;
    
    admin.auth().verifyIdToken(userToken, true).then((payload) => {
        const userId = payload.uid;

        pool.query(
            `UPDATE compte SET id_github = ? WHERE id_compte = ?`,
            [id_github, userId],
            function (err, results) {
                if (err) {
                    console.log(err.toString())
                    logger.info(`Erreur lors de lexecution de la query POST id github: ${err.code}`)
                    res.status(500).send(err)
                }
                else {
                    res.status(200).send()
                }
            });

    }).catch((error) => {
        res.status(500).send('Erreur de base de données', error)
    })

});
