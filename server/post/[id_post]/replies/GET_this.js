const express = require('express')
const app = express()
const { pool } = require('../../../serveur.js')


module.exports = app.get('/:post_id/replies', (req, res) => {
    console.log(req.params)
    const userId = req.headers.authorization

    pool.query(`
        SELECT post_view.*,
            vote.id_compte AS vote_user_id,
            vote.score
        FROM post_view
            LEFT JOIN vote ON post_view.id_post = vote.id_post AND post_view.id_compte = ?
        where post_view.id_parent like ?
        and post_view.id_type_post != 7
        order by date_publication desc;`,
        [userId, req.params.post_id],
        function (err, results, fields) {
            if (err) {
                // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
                console.log(err)
                res.status(500).send('Erreur de base de données', err)
            }
            if (results) {
                res.status(200).send(results)
            }
        })
});