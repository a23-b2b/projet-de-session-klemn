const express = require('express')
const app = express()
const { pool } = require('../../serveur.js')
const logger = require('../../logger.js')

module.exports = app.get('/:projet_id', (req, res) => {
    const projetId = req.params.projet_id

    pool.query(`
        SELECT compte_id_proprio, id_projet, titre_projet, description_projet, url_repo_git, est_ouvert
        FROM projet
        WHERE projet.id_projet LIKE ?;`,
        [projetId],
        function (err, results, fields) {
            if (err) {
                logger.info(err.code)
                res.status(500).send(`ERREUR: ${err.code}`)
            }
            if (results) {
                logger.info(JSON.stringify(results))
                res.status(200).send(results)
            }
        })
});