const express = require('express')
const app = express()
const { admin } = require('../../serveur.js')
const { pool } = require('../../serveur.js')


module.exports = app.get('/feed/:offset', (req, res) => {
    const offset = parseInt(req.params.offset);
    const userToken = req.headers.authorization;
    const limit = 6


    admin.auth().verifyIdToken(userToken, true).then((payload) => {
        const userId = payload.uid

        console.log(userId)

        pool.query(`
            SELECT post_view.*,
                vote.id_compte AS vote_user_id,
                vote.score
            FROM post_view
                LEFT JOIN vote ON post_view.id_post = vote.id_post AND post_view.id_compte = ?           
            where id_type_post != 4
            order by date_publication desc
            limit ? offset ?;`,
            [userId, limit, offset],
            function (err, results, fields) {
                if (err) {
                    // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
                    res.status(500)
                }
                if (results) {
                    // console.log(results)
                    res.status(200).send(results)
                }
            })
    })
        .catch((error) => {
            return res.status(500).send("ERREUR: " + error.code)
        });
});