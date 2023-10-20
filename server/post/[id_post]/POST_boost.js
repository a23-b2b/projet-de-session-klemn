const express = require('express')
const { body, validationResult } = require('express-validator');
const { pool } = require('../../serveur.js')
const { admin } = require('../../serveur.js')

const app = express()

module.exports = app.post('/:id_post/boost', [body('contenu').notEmpty().isLength({ max: 4000 })], (req, res) => {
    const resultatValidation = validationResult(req);
    if (resultatValidation.isEmpty()) {

        const contenu = req.body.contenu;
        const boostedPostId = req.body.id_post;
        const idToken = req.headers.authorization;

        admin.auth().verifyIdToken(idToken, true).then((payload) => {

            const userId = payload.uid;

            pool.query(
                `INSERT INTO post 
                    (
                        id_post, 
                        id_compte, 
                        id_type_post, 
                        contenu, 
                        nombre_likes, 
                        nombre_dislikes,
                        nombre_reposts, 
                        nombre_commentaires, 
                        nombre_partages, 
                        date_publication
                    )
                     VALUES (
                        SUBSTRING(MD5(UUID()) FROM 1 FOR 12), 
                        ?, 
                        6, 
                        ?, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        NOW()
                    );

                    INSERT INTO post_partage
                        (id_post_original, id_shared_post, is_quoted_post)
                    VALUES ( (SELECT id_post
                            FROM post
                            WHERE id_compte = ?
                            order by date_publication desc
                            limit 1)
                        , ?, false);
                        
                    SELECT id_post
                    FROM post
                    WHERE id_compte = ?
                    order by date_publication desc
                    limit 1;`,
                [userId, contenu, userId, boostedPostId, userId],
                function (err, results, fields) {
                    if (err) {
                        // logger.info("Erreur lors de lexecution de la query.", err)
                        console.log(err)
                        res.status(500).send("ERREUR: " + err.code)

                    } else {
                        res.send(JSON.stringify(results[2][0]))
                    }
                }
            );

        }).catch((error) => {
            res.status(500).send("ERREUR: " + error.code)
        });

    } else {
        // Erreur de validation des donnees (Express-validator)
        res.send(JSON.stringify(resultatValidation))
    }
})