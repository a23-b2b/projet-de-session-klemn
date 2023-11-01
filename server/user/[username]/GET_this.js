const express = require('express')
const app = express()
const { pool } = require('../../serveur.js')


module.exports = app.get('/:username', async (req, res) => {
    const username = req.params.username;
    const userId = req.headers.authorization;

    pool.query(`
        SELECT compte.id_compte,
            date_creation_compte,
            nom,
            prenom,
            nom_utilisateur,
            nom_affichage,
            nombre_abonnes,
            nombre_abonnements,
            biographie,
            url_image_profil,
            url_image_banniere,
            b.badges
        FROM compte
            left join badge b on compte.id_compte = b.id_compte
        WHERE ? LIKE nom_utilisateur;`,
        [username],

        function (err, profileResults, fields) {

            if (err) return res.status(500).send(err)

            if (!profileResults[0]) return res.status(404).send({ "erreur": "Le profil recherché n'existe pas." })

            pool.query(`           
            SELECT count(*)
            FROM compte_suivi
            WHERE id_compte=?
            AND suit=?;`,
                [userId, profileResults[0]["id_compte"]],

                function (err, results, fields) {
                    if (err) {
                        // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
                        console.log(err)
                        res.status(500).send('Erreur de base de données', err)
                    }

                    let visitorFollowsProfile;

                    console.log(results[0]["count(*)"])

                    if (results[0]["count(*)"] > 0) {
                        visitorFollowsProfile = true;
                    } else visitorFollowsProfile = false;

                    profileResults = { ...{ visitor_follows_profile: visitorFollowsProfile }, ...profileResults[0] }
                    console.log(profileResults)

                    if (results) {
                        res.status(200).send(profileResults)
                    }
                })
        })
});