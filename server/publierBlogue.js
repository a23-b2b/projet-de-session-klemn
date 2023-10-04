const express = require('express')
const {body, validationResult} = require('express-validator');
const mysql = require('mysql2')
const {logger} = require('./serveur.js')
const { admin } = require('./serveur.js');
const { type } = require('os');



const app = express()


const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
})


module.exports = app.post('/', [body('contenu').notEmpty().isLength({max: 4000})], (req, res) => {
    const resultatValidation = validationResult(req);
    if (resultatValidation.isEmpty()) {

        const id_compte = req.body.id_compte;

        const titre = req.body.titre;
        const contenu = req.body.contenu;
        const idToken = req.body.firebase_id_token

        admin.auth().verifyIdToken(idToken, true)
            .then((payload) => {

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
                            res.send(JSON.stringify(results))
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