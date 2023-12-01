const express = require('express')
const logger = require('../logger.js')
const app = express()
const { pool, admin } = require('../serveur.js')
const { body, validationResult } = require('express-validator');

const query = 
     `
    INSERT INTO projet 
        (id_projet, 
        titre_projet, 
        description_projet, 
        url_repo_git, 
        est_ouvert,
        compte_id_proprio)
    VALUES
        (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), 
        ?, 
        ?,
        ?, 
        ?, 
        ?)
    ;`

// TODO: chaine de validation avec const { body, validationResult } = require('express-validator');
module.exports = app.post('/add/', 
    [body('titre_projet').notEmpty().isLength({ max: 4000 })], (req, res) => { 
        
        const titre_projet = req.body.titre_projet;
        const description_projet = req.body.description_projet;
        const url_repo_git = req.body.url_repo_git;
        const est_ouvert = req.body.est_ouvert;

        const idToken = req.headers.authorization;

        logger.info(`Creation d'un nouveau projet: ${titre_projet}`)
        admin.auth().verifyIdToken(idToken, true).then((payload) => {
            const userId = payload.uid;

            pool.query(
                query,
                [titre_projet,
                description_projet,
                url_repo_git,
                est_ouvert,
                userId],
                function(err) {
                    if (err) {
                        res.status(500).send()
                        logger.info(JSON.stringify(err.toString()))
                    } else {
                        res.status(200).send()
                    } 
                }
            )
        }).catch((error) => {
            res.status(500).send("ERREUR: " + error.code)
        })
})
