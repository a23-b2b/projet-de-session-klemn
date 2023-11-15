const express = require('express')
const { pool } = require('../../serveur.js')
const { admin } = require('../../serveur.js')
const { logger } = require('../../logger.js')

const app = express()

module.exports = app.post('/:id_post/edit', (req, res) => {
    const idOfPostToEdit = req.params.id_post;
    const idToken = req.headers.authorization;

    const newContent = req.body.new_content

    admin.auth().verifyIdToken(idToken, true).then((payload) => {
        const userId = payload.uid;
        pool.query(`
            SELECT count(*) FROM post WHERE id_compte = ? AND id_post = ?;`,
            [userId, idOfPostToEdit],
            function (err, results, fields) {
                if (err) {
                    // logger.info("Erreur lors de lexecution de la query.", err)
                    console.log(err)
                    return res.status(500).send("ERREUR: " + err.code)
                }

                if (results[0]["count(*)"] > 0) {
                    pool.query(`
                        INSERT INTO post_edit (id_post, ancien_contenu, date_modification)
                        VALUES (
                            ?,
                            (SELECT contenu FROM post WHERE post.id_post = ?),
                            NOW()
                        );

                        UPDATE post
                        SET contenu = ?, est_modifie = 1
                        WHERE id_post = ?;`,
                        [idOfPostToEdit, idOfPostToEdit, newContent, idOfPostToEdit],
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
                }

                if (results[0]["count(*)"] <= 0) {
                    return res.status(403).send({"erreur": "Vous ne pouvez pas modifier une publication qui ne vous appartient pas ou qui n'existe pas."})
                }
            }
        );




    }).catch((error) => {
        res.status(500).send("ERREUR: " + error.code)
    });
})