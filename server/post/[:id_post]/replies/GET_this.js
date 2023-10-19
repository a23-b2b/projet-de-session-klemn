const express = require('express')
const app = express()
const { pool } = require('../../../serveur.js')


module.exports = app.get('/:post_id/replies', (req, res) => {
    console.log(req.params)
    const userId = req.headers.authorization

    pool.query(`
        select post.*, c.nom_affichage, c.nom_utilisateur, c.url_image_profil, v.score as vote
        from post
        left join vote v on post.id_post = v.id_post and v.id_compte = ? 
        inner join compte c on post.id_compte = c.id_compte
        where post.id_parent like ?
        order by date_publication desc;
    `,
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