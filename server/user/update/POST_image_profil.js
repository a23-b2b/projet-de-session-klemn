const express = require('express')
const app = express()
const { check, body, validationResult } = require('express-validator');
const { admin } = require('../../serveur.js')
const { logger } = require('../../serveur.js')
const { pool } = require('../../serveur.js')
const {getStorage, ref} = require("firebase-admin/storage");


module.exports = app.post('/update/image_profil', (req, res) => {
    const storage = getStorage()
    const userToken = req.headers.authorization;
    const newImage = req.body.new_image;


    admin.auth().verifyIdToken(userToken, true).then((payload) => {
        const userId = payload.uid;

        pool.query(
            `UPDATE compte SET url_image_profil = ? WHERE id_compte = ?`,
            [newImage, userId],
            function (err, results) {
                if (err) {
                    // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
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
