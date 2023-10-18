const express = require('express')
const app = express()
const { pool } = require('./serveur.js')


module.exports = app.post('/', (req, res) => {
    const offset = parseInt(req.body.offset);
    const userId = req.body.user_id
    const limit = 6

    console.log(userId)

    pool.query(`
            select post.*, c.nom_affichage, c.nom_utilisateur, c.url_image_profil, v.score as vote
            from post
            left join vote v on post.id_post = v.id_post and v.id_compte = ?
            inner join compte c on post.id_compte = c.id_compte
            where id_type_post != 4
            order by date_publication desc
            limit ? offset ?;
        `,
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
});