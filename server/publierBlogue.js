const express = require('express')
const { body, validationResult } = require('express-validator');
const mysql = require('mysql2')
const crypto = require('crypto')
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

async function gererErreur(err, res, results, msg) {
    if (err) {
        logger.info(`ERREUR: ` + err.code + `; Log: [${msg}]`)
        await res.status(500).send(`ERREUR: ` + err.code + `; Log: [${msg}]`)
    } else if (results) {
        await res.send(JSON.stringify(results));
    }
}


module.exports = app.post('/:type', [body('contenu').notEmpty().isLength({ max: 4000 })], (req, res) => {
    const resultatValidation = validationResult(req);
    if (resultatValidation.isEmpty()) {

        const id_compte = req.body.id_compte;

        const titre = req.body.titre;
        const contenu = req.body.contenu;
        const idToken = req.body.firebase_id_token;

        const typePoste = req.params.type;



        admin.auth().verifyIdToken(idToken, true)
            .then((payload) => {                
                mysqlConnection.query(
                    `INSERT INTO post (id_post, id_compte, id_type_post, titre, contenu, nombre_likes, nombre_dislikes,
                                       nombre_reposts, nombre_commentaires, nombre_partages, date_publication)
                     VALUES (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), ?, 1, ?, ?, 0, 0, 0, 0, 0, NOW());
                     
                     SELECT id_post FROM post WHERE  id_compte=? order by date_publication desc limit 1;`,
                    [id_compte, titre, contenu, id_compte],
                    function (err, results, fields) {
                        gererErreur(err, res, results, "POSTER BLOGUE ERR");
                        console.log(results);
                        console.log()
                        const id_post = results[1][0].id_post;

                        if (typePoste == 'collab') {
                            mysqlConnection.query(
                                `INSERT INTO post_collab (id_collab, est_ouvert, url_git, post_id_post)
                                VALUES (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), true, null, ?);`,
                                // TODO: AJOUTER URL_GIT DANS FORM POUR COLLAB
                                [id_post],
                                function (err, results) {
                                    gererErreur(err, res, results, "POSTER COLLAB ERR");
                                }
                            );
                        } else if (typePoste == 'question') {
                            mysqlConnection.query(
                                `INSERT INTO post_question (id_question, est_resolu, id_reponse_choisie, post_id_post)
                                VALUES (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), false, null, ?);`,
                                [id_post],
                                function (err, results) {
                                    gererErreur(err, res, results, "POSTER QUESTION ERR");
                                }
                            );
                        }
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