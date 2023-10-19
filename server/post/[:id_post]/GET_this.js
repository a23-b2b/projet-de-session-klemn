const express = require('express')
const app = express()
const mysql = require('mysql2')
const { pool } = require('./serveur.js')

module.exports = app.get('/:post_id', (req, res) => {
    console.log(req.params)
    const userId = req.headers.authorization

    console.log(userId)

    pool.query(`
        select post.*, c.nom_affichage, c.nom_utilisateur, c.url_image_profil, v.score as vote
        from post
        left join vote v on post.id_post = v.id_post and v.id_compte = ?
        inner join compte c on post.id_compte = c.id_compte
        where post.id_post like ?;
    `,
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