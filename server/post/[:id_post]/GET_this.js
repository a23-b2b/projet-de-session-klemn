const express = require('express')
const app = express()
const { pool } = require('../../serveur.js')

module.exports = app.get('/:post_id', (req, res) => {
    console.log(req.params)
    const userId = req.headers.authorization

    console.log(userId)

    pool.query(`
        select post.*, c.nom_affichage, c.nom_utilisateur, c.url_image_profil, v.score as vote, post_partage.id_shared_post, post_partage.is_quoted_post
        from post
        left join vote v on post.id_post = v.id_post and v.id_compte = ?
        left join post_partage on post.id_post = post_partage.id_post_original
        inner join compte c on post.id_compte = c.id_compte
        where post.id_post like ?;`,
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