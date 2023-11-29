const express = require('express')
const app = express()
const logger = require('../logger.js')
const { pool } = require('../serveur.js')

module.exports = app.get('/:compte_id_proprio', (req, res) => {
    const id_proprio = req.params.compte_id_proprio

    // Si accepted, faire update true + insert collaborateur
    // Sinon, faire update false
    pool.query(`
        SELECT compte_id_proprio, id_projet, titre_projet, description_projet, url_repo_git, est_ouvert
            FROM projet
            WHERE compte_id_proprio = ?
            ORDER BY titre_projet;`,
        [id_proprio],
        function (err, results) {
            if (err) {
                res.status(500).send()
                logger.info(JSON.stringify(err))
            } else if (results) {
                res.send(results)
            }
        }
    )

})