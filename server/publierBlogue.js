const express = require('express')
const { body, validationResult } = require('express-validator');
const mysql = require('mysql2')
const { logger } = require('./serveur.js')
const { admin } = require('./serveur.js')

const app = express()

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
})

// "Enum" des types de post (pas de enum en JS)
const TypesDePost = {
    BlogLong: "bloglong",
    BlogCourt: "blogcourt",
    Question: "question",
    Collab: "collab",
    Quote: "quote",
    Boost: "boost"
}


module.exports = app.post('/:type', [body('contenu').notEmpty().isLength({ max: 4000 })], (req, res) => {
    const resultatValidation = validationResult(req);
    if (resultatValidation.isEmpty()) {

        const id_compte = req.body.id_compte;
        const titre = req.body.titre;
        const contenu = req.body.contenu;
        const idToken = req.body.firebase_id_token;
        const quotedPostId = req.body.quoted_post_id;
        const boostedPostId = req.body.boosted_post_id;
        const urlGit = req.body.urlGit;
        const typePoste = req.params.type;

        let typePost

        // post de quote
        if (quotedPostId) {
            typePost = TypesDePost.Quote
        }

        if (boostedPostId) {
            typePost = TypesDePost.Boost
        }

        if (titre && contenu && !quotedPostId && !boostedPostId) {
            typePost = TypesDePost.BlogLong
        }

        if (typePoste == "question") {
            typePost = TypesDePost.Question
        }

        if (typePoste == "collab") {
            typePost = TypesDePost.Collab
        }


        admin.auth().verifyIdToken(idToken, true)
            .then((payload) => {

                if (typePost === TypesDePost.Quote) {
                    mysqlConnection.query(
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
                            5, 
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
                            , ?, true);
                            
                        SELECT id_post
                        FROM post
                        WHERE id_compte = ?
                        order by date_publication desc
                        limit 1;`,
                        [id_compte, contenu, id_compte, quotedPostId, id_compte],
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
                }

                if (typePost === TypesDePost.Boost) {
                    mysqlConnection.query(
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
                        [id_compte, contenu, id_compte, boostedPostId, id_compte],
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

                }

                if (typePost === TypesDePost.BlogLong) {
                    mysqlConnection.query(
                        `INSERT INTO post (id_post, id_compte, id_type_post, titre, contenu, nombre_likes, nombre_dislikes,
                                           nombre_reposts, nombre_commentaires, nombre_partages, date_publication)
                         VALUES (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), ?, 1, ?, ?, 0, 0, 0, 0, 0, NOW());
                         SELECT id_post FROM post WHERE  id_compte=? order by date_publication desc limit 1;`,
                        [id_compte, titre, contenu, id_compte],
                        function (err, results, fields) {
                            if (err) {
                                // logger.info("Erreur lors de lexecution de la query.", err)
                                console.log(err)
                                res.status(500).send("ERREUR: " + err.code)

                            } else {
                                res.send(JSON.stringify(results[1][0]))
                            }
                        }
                    );
                }

                if (typePost === TypesDePost.Collab) {
                    mysqlConnection.query(
                        `INSERT INTO post (id_post, id_compte, id_type_post, titre, contenu, nombre_likes, nombre_dislikes,
                                           nombre_reposts, nombre_commentaires, nombre_partages, date_publication)
                         VALUES (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), ?, 3, ?, ?, 0, 0, 0, 0, 0, NOW());
                         
                         INSERT INTO post_collab 
                            (id_collab, est_ouvert, url_git, post_id_post)
                         VALUES (
                            SUBSTRING(MD5(UUID()) FROM 1 FOR 12), 
                            true, 
                            ?, 
                            (SELECT id_post FROM post WHERE id_compte=? order by date_publication desc limit 1)
                         );
                         
                        SELECT id_post
                        FROM post
                        WHERE id_compte = ?
                        order by date_publication desc
                        limit 1;`,
                        [id_compte, titre, contenu, id_compte, urlGit, id_compte],
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
                }

                if (typePost === TypesDePost.Question) {
                    mysqlConnection.query(
                        `INSERT INTO post (id_post, id_compte, id_type_post, titre, contenu, nombre_likes, nombre_dislikes,
                            nombre_reposts, nombre_commentaires, nombre_partages, date_publication)
                         VALUES (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), ?, 2, ?, ?, 0, 0, 0, 0, 0, NOW());
                         
                         INSERT INTO post_question 
                            (id_question, est_resolu, post_id_post, post_meilleure_reponse)
                         VALUES (
                            SUBSTRING(MD5(UUID()) FROM 1 FOR 12), 
                            false, 
                            (SELECT id_post FROM post WHERE id_compte=? order by date_publication desc limit 1), 
                            null
                         );
                         
                         SELECT id_post
                         FROM post
                         WHERE id_compte = ?
                         order by date_publication desc
                         limit 1;`,
                        [id_compte, titre, contenu, id_compte, id_compte],
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
                }
            })
            .catch((error) => {
                res.status(500).send("ERREUR: " + error.code)
            });

    } else {
        // Erreur de validation des donnees (Express-validator)
        res.send(JSON.stringify(resultatValidation))
    }
})