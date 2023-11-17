const express = require('express')
const app = express()
const { check, body, validationResult } = require('express-validator');
const mysql = require('mysql2')
const { admin } = require('../../../serveur.js')
const { logger } = require('../../../logger')
const { pool } = require('../../../serveur.js')


module.exports = app.post('/:projet_id',
    [body('titre_projet').notEmpty().isLength({ max: 4000 })], (req, res) => {
    const resultatValidation = validationResult(req);

    const projetId = req.params.projet_id;
    const userToken = req.headers.authorization;
    const titre_projet = req.body.titre_projet;
    const description_projet = req.body.description_projet;
    const url_repo_git = req.body.url_repo_git;
    const est_ouvert = req.body.est_ouvert;

    if (resultatValidation.isEmpty()) {
        admin.auth().verifyIdToken(userToken, true).then((payload) => {
            const userId = payload.uid;

            pool.query(
                `UPDATE projet
                 SET titre_projet       = ?,
                     description_projet = ?,
                     url_repo_git       = ?,
                     est_ouvert         = ?
                 WHERE compte_id_proprio = ?
                   AND id_projet = ?`,
                [titre_projet, description_projet, url_repo_git, est_ouvert, userId, projetId],
                function (err, results) {
                    if (err) {
                        logger.info(`Erreur lors de lexecution de la query POST nom: ${err.code}`)
                        res.status(500).send('Erreur de base de données')
                    }
                    if (results) {
                        console.log(results)
                        res.status(200).send(results)
                    }
                });
        }).catch((error) => {
            res.status(500).send('Erreur de base de données')
        })
    }  else {
        logger.error(resultatValidation.array())
        res.status(500).send('Erreur de validation du contenu')
    }


});
