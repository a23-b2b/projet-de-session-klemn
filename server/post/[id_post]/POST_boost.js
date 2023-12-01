const express = require('express');
const { body, validationResult } = require('express-validator');
const { pool } = require('../../serveur.js');
const { admin } = require('../../serveur.js');

const app = express();

module.exports = app.post('/:id_post/boost', [body('contenu').notEmpty().isLength({ max: 4000 })], (req, res) => {
    const resultatValidation = validationResult(req);
    if (resultatValidation.isEmpty()) {

        const contenu = req.body.contenu;
        const boostedPostId = req.params.id_post;
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
                    VALUES (
                        (SELECT id_post
                            FROM post
                            WHERE id_compte = ?
                            ORDER BY date_publication DESC
                            LIMIT 1),
                        ?, false
                    );
                    
                    SELECT id_post
                    FROM post
                    WHERE id_compte = ?
                    ORDER BY date_publication DESC
                    LIMIT 1;
                    
                    SELECT COUNT(*) as nombre_partages
                    FROM post_partage
                    WHERE id_post_original = (SELECT id_post FROM post WHERE id_compte = ? ORDER BY date_publication DESC LIMIT 1);

                    UPDATE post
                    SET nombre_partages = nombre_partages + 1
                    WHERE id_post = ?;
                `,
                [userId, contenu, userId, boostedPostId, userId, userId, boostedPostId],
                function (err, results, fields) {
                    if (err) {
                        res.status(500).send("ERREUR de BD: " + err);
                    } else {
                        const response = {
                            post: results[2][1],
                            nombrePartages: results[3][0].nombre_partages
                        };

                        // id_post = response.post;
                        // nombre_partages = response.nombrePartages;

                        // // Mettre à jour le post ici, après l'insertion
                        // pool.query(
                        //     `UPDATE post
                        //     SET nombre_partages = ? 
                        //     WHERE id_post = ?`,
                        //     [nombre_partages, id_post],
                        //     (updateErr, updateResults) => {
                        //         if (updateErr) {
                        //             console.log(updateErr);
                        //             res.status(500).send("ERREUR: " + updateErr.code);
                        //         } else {
                        //             res.send(JSON.stringify(response));
                        //         }
                        //     }
                        // );

                        res.send(JSON.stringify(response));
                    }
                }
            );

        }).catch((error) => {
            res.status(500).send("ERREUR d'auth: " + error);
        });

    } else {
        // Erreur de validation des données (Express-validator)
        res.send(JSON.stringify(resultatValidation));
    }
});
