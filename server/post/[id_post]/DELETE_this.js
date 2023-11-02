const express = require('express')
const { pool } = require('../../serveur.js')
const { admin } = require('../../serveur.js')
const { logger } = require('../../logger')

const app = express()

module.exports = app.delete('/:id_post', (req, res) => {
    const postToDeleteId = req.params.id_post;
    const idToken = req.headers.authorization;

    admin.auth().verifyIdToken(idToken, true).then((payload) => {
        pool.query(
            `DELETE
             FROM post_partage
             WHERE id_shared_post = ?
               AND is_quoted_post = 0;

            DELETE
            FROM post_collab
            WHERE post_id_post = ?;

            DELETE
            FROM post_question
            WHERE post_id_post = ?;

            UPDATE post
            SET id_compte    = 'deleted',
                id_type_post = 7,
                titre        = NULL,
                contenu      = 'Cette publication a été supprimée',
                est_markdown = 0
            WHERE id_post = ?;

            UPDATE post
            SET nombre_commentaires = nombre_commentaires - 1
            WHERE id_post = (SELECT p2.id_parent
                             FROM (SELECT id_post, id_parent FROM post) as p2
                             WHERE p2.id_post = ?);`,
            [postToDeleteId, postToDeleteId, postToDeleteId, postToDeleteId, postToDeleteId],
            function (err, results, fields) {
                if (err) {
                    // logger.info("Erreur lors de lexecution de la query.", err)
                    console.log(err)
                    res.status(500).send("ERREUR: " + err.code)

                } else {
                    res.status(200).send(results)
                }
            }
        );


    }).catch((error) => {
        res.status(500).send("ERREUR: " + error.code)
    });
})