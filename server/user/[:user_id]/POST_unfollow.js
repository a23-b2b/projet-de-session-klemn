const express = require('express')
const { body, validationResult } = require('express-validator');
const mysql = require('mysql2')
const crypto = require('crypto')
const { logger } = require('../../serveur.js')
const { admin } = require('../../serveur.js')

const app = express()


const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
})


module.exports = app.post('/:user_id/unfollow', (req, res) => {
    const resultatValidation = validationResult(req);

    const userToken = req.headers.authorization;
    const userToUnollow = req.params.user_id

    admin.auth().verifyIdToken(userToken, true)
        .then((payload) => {

            const userId = payload.uid

            console.log(userId, 'wants to unfollow', userToUnollow)

            if (userId === userToUnollow) {
                return res.status(401).send("ERREUR: Vous ne pouvez pas vous suivre vous-même.");
            }

            mysqlConnection.query(
                `SELECT count(*) 
                FROM compte_suivi 
                WHERE compte=?
                AND suit=?`,
                [userId, userToUnollow],
                function (err, results, fields) {
                    console.log(results)
                    if (err) {
                        // logger.info("Erreur lors de lexecution de la query.", err)
                        console.log(err)
                        res.status(500).send("ERREUR: " + err.code)
                    }

                    if (results[0]["count(*)"] === 0) {
                        res.status(401).send("Vous ne suivez pas cet utilisateur.")
                    }

                    else {
                        mysqlConnection.query(
                            `DELETE FROM compte_suivi
                            WHERE compte = ? 
                            AND suit = ?;
            
                            UPDATE compte 
                            SET nombre_abonnements = nombre_abonnements - 1 
                            WHERE id_compte = ?;
            
                            UPDATE compte SET 
                            nombre_abonnes = compte.nombre_abonnes - 1 
                            WHERE id_compte = ?;`,
                            [userId, userToUnollow, userId, userToUnollow],
                            function (err, results, fields) {
                                if (err) {
                                    // logger.info("Erreur lors de lexecution de la query.", err)
                                    console.log(err)
                                    return res.status(500).send("ERREUR: " + err.code)

                                } else {
                                    return res.send(JSON.stringify(results))
                                }
                            }
                        );
                    }
                }
            );
        })
        .catch((error) => {
            return res.status(500).send("ERREUR: " + error.code)
        });

})