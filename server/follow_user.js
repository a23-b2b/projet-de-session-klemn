const express = require('express')
const { body, validationResult } = require('express-validator');
const crypto = require('crypto')
const { admin } = require('./serveur.js')
const { pool } = require('./serveur.js')
const app = express()


module.exports = app.post('/', (req, res) => {
    const resultatValidation = validationResult(req);

    const userId = req.body.user_id;
    const wantsToFollow = req.body.wants_to_follow;
    const idToken = req.body.firebase_id_token

    console.log(userId, 'wants to follow', wantsToFollow)

    if (userId === wantsToFollow) {
        return res.status(401).send("ERREUR: Vous ne pouvez pas vous suivre vous-même.");
    }

    admin.auth().verifyIdToken(idToken, true)
        .then((payload) => {

            pool.query(
                `SELECT count(*) 
                FROM compte_suivi 
                WHERE compte=?
                AND suit=?`,
                [userId, wantsToFollow],
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
                            [userId, wantsToFollow, userId, wantsToFollow],
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