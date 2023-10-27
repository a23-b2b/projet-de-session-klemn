const express = require('express')
const app = express()
const { admin } = require('../../serveur.js')
const { pool } = require('../../serveur.js')


module.exports = app.get('/followed/:cursor', (req, res) => {
    const userCursor = parseInt(req.params.cursor);
    const userToken = req.headers.authorization;
    const limit = 10

    admin.auth().verifyIdToken(userToken, true).then((payload) => {
        const userId = payload.uid

        pool.query(`
            SELECT
                post_view.*,
                vote.id_compte AS vote_user_id,
                vote.score
            FROM post_view
                LEFT JOIN vote ON post_view.id_post = vote.id_post AND post_view.id_compte = ?
                INNER JOIN compte_suivi cs ON post_view.id_compte = cs.suit
            WHERE post_view.numero_post <
                IF(? = -1, (SELECT COUNT(*) FROM post_view), ?)
                AND post_view.id_type_post != 4
                AND compte LIKE ?
            LIMIT ?;`,
            [userId, userCursor, userCursor, userId, limit],
            function (err, results, fields) {
                if (err) {
                    res.status(500)
                }

                if (results) {
                    let nextCursor = NaN;
                    if (results.length === limit) nextCursor = results[limit - 1]['numero_post']

                    res.status(200).send({ "newCursor": nextCursor, "posts": [...results] })
                }
            })
    })
});