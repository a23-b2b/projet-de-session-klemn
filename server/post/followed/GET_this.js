const express = require('express')
const app = express()
const { admin } = require('../../serveur.js')
const { pool } = require('../../serveur.js')


module.exports = app.get('/followed/:offset', (req, res) => {
    const offset = parseInt(req.params.offset);
    const userToken = req.headers.authorization;
    const limit = 6

    admin.auth().verifyIdToken(userToken, true).then((payload) => {
        const userId = payload.uid

        pool.query(`       
            SELECT post_view.*,
                vote.score as vote
            FROM post_view
                LEFT JOIN vote ON post_view.id_post = vote.id_post AND vote.id_compte = ?
            inner join compte_suivi cs on post_view.id_compte = cs.suit 
            WHERE compte LIKE ? AND id_type_post != 4
            order by date_publication desc
            limit ? offset ?;`,
            [userId, userId, limit, offset],
            function (err, results, fields) {
                if (err) {
                    // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
                    res.status(500)
                }
                if (results) {
                    console.log(results)
                    res.status(200).send(results)
                }
            })
    })
});