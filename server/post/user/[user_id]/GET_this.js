const express = require('express')
const app = express()
const { pool } = require('../../../serveur.js')


module.exports = app.get('/user/:user_id/:offset', (req, res) => {
    console.log(req.params)
    const offset = parseInt(req.params.offset);
    const userToGet = req.params.user_id;
    const limit = 6

    const authUserId = req.headers.authorization

    pool.query(`
        SELECT post_view.*,
            vote.id_compte AS vote_user_id,
            vote.score
        FROM post_view
            LEFT JOIN vote ON post_view.id_post = vote.id_post AND post_view.id_compte = ?
        where post_view.id_compte like ? AND post_view.id_type_post != 4
        order by post_view.date_publication desc
        limit ? offset ?;`,
        [authUserId, userToGet, limit, offset],

        function (err, results, fields) {
            if (err) {
                // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
                console.log(err)
                res.status(500).send('Erreur de base de données', err)
            }
            if (results) {
                console.log(results)
                res.status(200).send(results)
            }
        })
});