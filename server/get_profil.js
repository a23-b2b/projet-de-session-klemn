const express = require('express')
const app = express()
const mysql = require('mysql2')

const { logger } = require('./serveur.js')

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})


module.exports = app.post('/', (req, res) => {
    const username = req.body.username;
    const isFollowedBy = req.body.is_followed_by;

    mysqlConnection.query(`
        SELECT 
            id_compte, 
            date_creation_compte,
            nom,
            prenom,
            nom_utilisateur,
            nom_affichage, 
            nombre_abonnes, 
            nombre_abonnements, 
            biographie,
            url_image_profil, 
            url_image_banniere 
        FROM compte 
        WHERE ? LIKE nom_utilisateur;`,
        [username],

        function (err, profileResults, fields) {
            mysqlConnection.query(`           
            SELECT count(*)
            FROM compte_suivi
            WHERE compte=?
            AND suit=?;`,
            [isFollowedBy, profileResults[0]["id_compte"]],

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
                
                profileResults = {...{visitor_follows_profile: visitorFollowsProfile}, ...profileResults[0]}
                console.log(profileResults)

                if (results) {
                    res.status(200).send(profileResults)
                }
            })
        })
});