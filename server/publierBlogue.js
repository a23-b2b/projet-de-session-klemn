const express = require('express')
const { body, validationResult } = require('express-validator');
const { admin } = require('./serveur.js')
const { pool } = require('./serveur.js')

const app = express()

module.exports = app.post('/:type', [body('contenu').notEmpty().isLength({max: 4000})], (req, res) => {
    const resultatValidation = validationResult(req);
    if (resultatValidation.isEmpty()) {

        const id_compte = req.body.id_compte;

        const titre = req.body.titre;
        const contenu = req.body.contenu;
        const idToken = req.body.firebase_id_token;
        const urlGit = req.body.urlGit;
        const typePoste = req.params.type;
        
        var id_type_post = 1;

        if (typePoste == "question") {
            id_type_post = 2;
        } else if (typePoste == "collab") {
            id_type_post = 3;
        }        

        admin.auth().verifyIdToken(idToken, true)
            .then((payload) => {

                pool.query(
                    `INSERT INTO post (id_post, id_compte, id_type_post, titre, contenu, nombre_likes, nombre_dislikes,
                                       nombre_reposts, nombre_commentaires, nombre_partages, date_publication)
                     VALUES (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), ?, 1, ?, ?, 0, 0, 0, 0, 0, NOW());
                     SELECT id_post FROM post WHERE  id_compte=? order by date_publication desc limit 1;`,
                    [id_compte, titre, contenu, id_compte],
                    function (err, results, fields) {
                        //gererErreur(err, res, results, "POSTER BLOGUE ERR");
                        
                        pool.query(
                            `SELECT id_post FROM post WHERE id_compte=? order by date_publication desc limit 1;`,
                            [id_compte],
                            function (err, results, fields) {
                                const id_post = JSON.parse(JSON.stringify(results[0])).id_post;
                                //console.log(results.id_post)

                                if (typePoste == 'collab') {
                                    pool.query(
                                        `INSERT INTO post_collab (id_collab, est_ouvert, url_git, post_id_post)
                                        VALUES (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), true, ?, ?);`,
                                        // TODO: AJOUTER URL_GIT DANS FORM POUR COLLAB
                                        [urlGit, id_post],
                                        function (err, results) {
                                            //gererErreur(err, res, results, "POSTER COLLAB ERR");
                                        }
                                    );
                                } else if (typePoste == 'question') {
                                    pool.query(
                                        `INSERT INTO post_question (id_question, est_resolu, post_id_post, post_meilleure_reponse)
                                        VALUES (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), false, ?, null);`,
                                        [id_post],
                                        function (err, results) {
                                            //gererErreur(err, res, results, "POSTER QUESTION ERR");
                                        }
                                    );
                                }
                            })
                    }
                );
            })
            .catch((error) => {
                res.status(500).send("ERREUR: " + error.code)
            });

    } else {
        // Erreur de validation des donnees (Express-validator)
        res.send(JSON.stringify(resultatValidation))
    }
})