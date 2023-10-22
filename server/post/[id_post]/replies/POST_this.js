import { pool, admin } from '../../../serveur'
import express from 'express'
import {body, validationResult} from 'express-validator'

const app = express()

export const POST_post_id_reply = app.post('/:post_id/replies', [body('contenu').notEmpty().isLength({max: 4000})], (req, res) => {
    const resultatValidation = validationResult(req);
    if (resultatValidation.isEmpty()) {

        const id_parent = req.body.id_parent;
        const contenu = req.body.contenu;
        const idToken = req.headers.authorization

        admin.auth().verifyIdToken(idToken, true)
            .then((payload) => {

                const userId = payload.uid;

                pool.query(
                    `INSERT INTO post (id_post, id_compte, id_parent, id_type_post, contenu, nombre_likes, nombre_dislikes,
                                       nombre_reposts, nombre_commentaires, nombre_partages, date_publication)
                     VALUES (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), ?, ?, 4, ?, 0, 0, 0, 0, 0, NOW());

                     UPDATE post SET nombre_commentaires = nombre_commentaires + 1 WHERE id_post = ?;

                     SELECT p.id_post, p.id_compte, p.date_publication, p.titre, p.contenu, p.nombre_likes, p.nombre_dislikes,
                      p.nombre_partages, p.nombre_commentaires, c.nom_affichage, c.nom_utilisateur, c.url_image_profil
                     FROM post p
                     JOIN compte c ON p.id_compte = c.id_compte
                     WHERE p.id_compte = ?
                     ORDER BY date_publication DESC LIMIT 1;
                     `,
                    [userId, id_parent, contenu, id_parent, userId, userId],
                    function (err, results, fields) {

                        console.log(results[1])
                        console.log(id_parent)
                        if (err) {
                            // logger.info("Erreur lors de lexecution de la query.", err)
                            console.log(err)
                            res.status(500).send("ERREUR: " + err.code)

                        } else {
                            res.json(results[2])
                        }
                    }
                );
            })
            .catch((error) => {
                console.log(error)
                res.status(500).send("ERREUR: " + error.code)
            });

    } else {
        // Erreur de validation des donnees (Express-validator)
        res.send(JSON.stringify(resultatValidation))
    }
})