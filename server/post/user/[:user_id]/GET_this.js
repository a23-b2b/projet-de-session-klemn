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
        post.*, v.score as vote
        from post
        left join vote v on post.id_post = v.id_post and v.id_compte = ? 
        where post.id_compte like ? AND post.id_type_post != 4
        order by post.date_publication desc
        limit ? offset ?;
    `,
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