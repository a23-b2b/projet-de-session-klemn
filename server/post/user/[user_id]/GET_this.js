const express = require('express')
const app = express()
const { pool } = require('../../../serveur.js')


module.exports = app.get('/user/:user_id/:cursor', (req, res) => {
    const userCursor = parseInt(req.params.cursor);
    const userToGet = req.params.user_id;
    const limit = 6

    const authUserId = req.headers.authorization

    pool.query(`
        SELECT 
            post_view.*,
            vote.score as vote
        FROM post_view
            LEFT JOIN vote ON post_view.id_post = vote.id_post AND vote.id_compte = ?
        WHERE post_view.numero_post <
            IF(? = -1, (SELECT COUNT(*) FROM post_view), ?)
            AND post_view.id_type_post != 4
            AND post_view.id_compte like ?
        LIMIT ?;`,
        [authUserId, userCursor, userCursor, userToGet, limit],
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
});