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
        select 
            post.*, v.score as vote, p.url_git, p.est_ouvert, p.id_collab, q.est_resolu, q.post_meilleure_reponse, post_partage.id_shared_post, post_partage.is_quoted_post
        from post
        left join vote v on post.id_post = v.id_post and v.id_compte = ?
        left join post_collab p on post.id_post = p.post_id_post
        left join post_question q on post.id_post = q.post_id_post
        left join post_partage on post.id_post = post_partage.id_post_original
        inner join compte c on post.id_compte = c.id_compte
        where post.id_compte like ? AND post.id_type_post != 4
        order by post.date_publication desc
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