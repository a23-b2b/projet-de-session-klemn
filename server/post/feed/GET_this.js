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
            select post.*, c.id_compte, c.nom_affichage, c.nom_utilisateur, c.url_image_profil, p.url_git, p.est_ouvert, p.id_collab, q.est_resolu, q.post_meilleure_reponse, v.score as vote
                from post
                left join vote v on post.id_post = v.id_post and v.id_compte = ?
                left join post_collab p on post.id_post = p.post_id_post
                left join post_question q on post.id_post = q.post_id_post
                inner join compte c on post.id_compte = c.id_compte            
                where id_type_post != 4
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
    })
        .catch((error) => {
            return res.status(500).send("ERREUR: " + error.code)
        });
});