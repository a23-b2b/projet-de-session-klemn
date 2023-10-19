const express = require('express')
const { body, validationResult } = require('express-validator');
const { admin } = require('./serveur.js')
const { pool } = require('./serveur.js')
const app = express()


module.exports = app.post('/', (req, res) => {
    const resultatValidation = validationResult(req);

    const userToken = req.headers.authorization;
    const userToFollow = req.params.user_id

    admin.auth().verifyIdToken(userToken, true)
        .then((payload) => {

            const userId = payload.uid

            console.log(userId, 'wants to follow', userToFollow)

            if (userId === userToFollow) {
                return res.status(401).send("ERREUR: Vous ne pouvez pas vous suivre vous-même.");
            }

            pool.query(
                `SELECT count(*) 
                FROM compte_suivi 
                WHERE compte=?
                AND suit=?`,
                [userId, userToFollow],
                function (err, results, fields) {
                    console.log(results)
                    if (err) {
                        // logger.info("Erreur lors de lexecution de la query.", err)
                        console.log(err)
                        res.status(500).send("ERREUR: " + err.code)

                    }

                    if (results[0]["count(*)"] > 0) {
                        res.status(401).send("Vous suivez déjà cet utilisateur.")
                    }

                    else {
                        pool.query(
                            `insert into compte_suivi 
                            (
                                compte, 
                                suit, 
                                suit_depuis
                            ) VALUES (
                                ?, 
                                ?,
                                NOW()
                            );
            
                            UPDATE compte 
                            SET nombre_abonnements = nombre_abonnements + 1 
                            WHERE id_compte = ?;
            
                            UPDATE compte SET 
                            nombre_abonnes = compte.nombre_abonnes + 1 
                            WHERE id_compte = ?;`,
                            [userId, userToFollow, userId, userToFollow],
                            function (err, results, fields) {
                                if (err) {
                                    // logger.info("Erreur lors de lexecution de la query.", err)
                                    console.log(err)
                                    return res.status(500).send("ERREUR: " + err.code)

                                } else {
                                    console.log(results)
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