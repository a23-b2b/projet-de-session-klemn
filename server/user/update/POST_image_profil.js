const express = require('express')
const app = express()
const {check, body, validationResult} = require('express-validator');
const {admin} = require('../../serveur.js')
const {logger} = require('../../serveur.js')
const {pool} = require('../../serveur.js')
const {getStorage, getDownloadURL} = require("firebase-admin/storage");

module.exports = app.post('/update/image_profil', (req, res) => {
    const storageBucket = getStorage().bucket()
    const userToken = req.headers.authorization;
    const newImage = req.body.new_image;

    if (!newImage || !newImage.type.includes('image/')) {
        res.status(422).send('Le blob reçu n\'est pas une image')
    }

    admin.auth().verifyIdToken(userToken, true).then((payload) => {
        const userId = payload.uid;
        const pathImage = `profil/${userId}`
        // const imageProfilRef;
        // getDownloadURL(imageProfilRef).then(urlImageProfil => {
        //     console.log(urlImageProfil)
        //     pool.query(
        //         `UPDATE compte
        //          SET url_image_profil = ?
        //          WHERE id_compte = ?`,
        //         [urlImageProfil, userId],
        //         function (err, results) {
        //             if (err) {
        //                 // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
        //                 console.log(err)
        //                 res.status(500).send('Erreur de base de données')
        //             }
        //             if (results) {
        //                 res.status(200).send(results)
        //             }
        //         });
        // })
    }).catch((error) => {
        console.log(error)
        res.status(500).send('Erreur de base de données')
    })

});
