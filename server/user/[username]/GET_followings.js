const { pool } = require('../../serveur.js');
const express = require('express');
const app = express();

module.exports = app.get('/:username/followings', async (req, res) => {
    const username = req.params.username;
    const userId = req.headers.authorization;

    pool.query(
        `
        SELECT 
            c_followings.nom_affichage,
            c_followings.nom_utilisateur,
            c_followings.url_image_profil
        FROM compte_suivi cs_followings
        JOIN compte c_followings ON cs_followings.suit = c_followings.id_compte
        WHERE cs_followings.id_compte = (SELECT id_compte FROM compte WHERE nom_utilisateur = ?);
        `,
        [username],
        function (err, followingsResults, fields) {
            if (err) {
                return res.status(500).send(err);
            }

            const followings = followingsResults.map((following) => ({
                nom_affichage: following.nom_affichage,
                nom_utilisateur: following.nom_utilisateur,
                url_image_profil: following.url_image_profil,
            }));

            return res.status(200).send({ followings });
        }
    );
});