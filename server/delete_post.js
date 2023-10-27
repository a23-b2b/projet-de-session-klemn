const express = require('express');
const app = express();
const mysql = require('mysql2');
const logger = require('./logger.js');
const { body, validationResult } = require('express-validator');


const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

module.exports = app.post('/', (req, res) => {
    const id_compte = req.body.authorization;
    const authUserId = req.headers.authorization

    const id_post = req.body.id_post;
    console.log(id_compte)

    // Vous devez récupérer l'auteur du post en question depuis la base de données.
    mysqlConnection.query('SELECT id_compte FROM post WHERE id_post = ?',
     [id_post],
     (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erreur de base de données', err);
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Post non trouvé');
            return;
        }

        const authorUsername = results[0].id_compte;
        console.log("cest l'auteur",authorUsername)
        console.log("cest le compte ",id_compte)


        // Maintenant, vous pouvez vérifier si l'utilisateur actuel correspond à l'auteur du post.
        if (id_compte === authorUsername) {
            // L'utilisateur actuel est l'auteur du post, vous pouvez autoriser la suppression.
            mysqlConnection.query('DELETE FROM post WHERE id_post = ?', [id_post], (deleteErr, deleteResults, deleteFields) => {
                if (deleteErr) {
                    console.log(deleteErr);
                    res.status(500).send('Erreur de base de données', deleteErr);
                    return;
                }

                res.status(200).send('Post supprimé avec succès');
            });
        } else {
            // L'utilisateur actuel n'est pas autorisé à supprimer ce post.
            res.status(403).send('Accès non autorisé');
        }
    });
});