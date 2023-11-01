const express = require('express')
const app = express()
const { pool } = require('../../serveur.js')

module.exports = app.get('/:post_id', (req, res) => {
    console.log(req.params)
    const userId = req.headers.authorization

    console.log(userId)

    pool.query(`
        SELECT post_view.*,
            vote.score as vote
        FROM post_view
            LEFT JOIN vote ON post_view.id_post = vote.id_post AND vote.id_compte = ?
        WHERE post_view.id_post LIKE ?;`,
        [userId, req.params.post_id],
        function (err, results, fields) {
            if (err) {
                console.log(err)
                // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
                res.status(500).send('Erreur de base de données', err)
            }
            if (results) {
                res.status(200).send(results)
            }
        })
});