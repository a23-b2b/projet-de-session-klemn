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
            select post.*, c.nom_affichage, c.nom_utilisateur, c.url_image_profil, v.score as vote, post_partage.id_shared_post, post_partage.is_quoted_post
            from post
            left join vote v on post.id_post = v.id_post and v.id_compte = ?
            left join post_partage on post.id_post = post_partage.id_post_original
            inner join compte c on post.id_compte = c.id_compte
            inner join compte_suivi cs on post.id_compte = cs.suit 
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