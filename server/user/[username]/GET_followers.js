const { pool } = require('../../serveur.js');
const express = require('express')
const app = express()

module.exports = app.get('/:username/followers', async (req, res) => {
    const username = req.params.username;
    const userId = req.headers.authorization;

    pool.query(`
        SELECT 
            c.id_compte,
            c.nom_utilisateur,
            c.nom_affichage,
            c.url_image_profil,
            b.badges,
            IFNULL(cs.suit, 0) AS suit
        FROM compte c
        LEFT JOIN badge b ON c.id_compte = b.id_compte
        LEFT JOIN compte_suivi cs ON c.id_compte = cs.suit
        WHERE c.nom_utilisateur = ?;`,
        [username],

        function (err, profileResults, fields) {
            if (err) {
                return res.status(500).send(err);
            }

            if (!profileResults[0]) {
                return res.status(404).send({ "erreur": "Le profil recherché n'existe pas." });
            }

            // Requête pour obtenir les followers 
            if (profileResults[0].suit !== null) {
                pool.query(`
                    SELECT 
                    c_followers.nom_affichage, c_followers.nom_utilisateur, c_followers.url_image_profil
                    FROM compte_suivi cs_followers
                    JOIN compte c_followers ON cs_followers.id_compte = c_followers.id_compte
                    WHERE cs_followers.suit = ?;`,
                    [profileResults[0].id_compte],

                    function (err, followersResults, fields) {
                        if (err) {
                            return res.status(500).send(err);
                        }

                        profileResults[0].followers = followersResults.map(follower => ({
                            nom_affichage: follower.nom_affichage,
                            nom_utilisateur: follower.nom_utilisateur,
                            url_image_profil: follower.url_image_profil


                        }));

                        pool.query(`
                            SELECT count(*)
                            FROM compte_suivi
                            WHERE id_compte = ?
                            AND suit = ?;`,
                            [userId, profileResults[0].id_compte],

                            function (err, results, fields) {
                                if (err) {
                                    return res.status(500).send(err);
                                }

                                let visitorFollowsProfile;

                                if (results[0]["count(*)"] > 0) {
                                    visitorFollowsProfile = true;
                                } else {
                                    visitorFollowsProfile = false;
                                }

                                return res.status(200).send(profileResults);
                            }
                        );
                    }
                );
            } else {
                return res.status(200).send(profileResults);
            }
        }
    );
})
