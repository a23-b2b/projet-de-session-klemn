const { pool } = require('../../serveur.js');
const express = require('express');
const app = express();

module.exports = app.get('/:username/followers', async (req, res) => {
    const username = req.params.username;

    try {
        const [profileResults] = await pool.promise().query(`
            SELECT 
                c_followers.nom_affichage, 
                c_followers.nom_utilisateur, 
                c_followers.url_image_profil
            FROM compte_suivi cs_followers
            JOIN compte c_followers ON cs_followers.id_compte = c_followers.id_compte
            WHERE cs_followers.suit = (
                SELECT id_compte
                FROM compte
                WHERE nom_utilisateur = ?
            );
        `, [username]);

        const followers = profileResults.map(follower => ({
            nom_affichage: follower.nom_affichage,
            nom_utilisateur: follower.nom_utilisateur,
            url_image_profil: follower.url_image_profil
        }));

        return res.status(200).send({ followers });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
