const express = require('express')
const app = express()
const mysql = require('mysql2')

const logger = require('./logger.js')

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

module.exports = app.get('/:id_compte', (req, res) => {
    const id_compte = req.params.id_compte
    
    mysqlConnection.query(`
        SELECT compte.id_compte, compte.url_image_profil, compte.nom_utilisateur, p.id_projet, p.titre_projet, p.description_projet, d.id_demande_collab
            FROM compte 
            INNER JOIN projet p ON compte.id_compte = p.compte_id_proprio
            INNER JOIN demande_collab d ON p.id_projet = d.projet_id_projet
            WHERE p.compte_id_proprio = ? 
            AND d.est_accepte IS null;`, 
        [id_compte],
        function(err, results, fields) {
            if (err) {
                res.status(500).send()
                logger.info(JSON.stringify(err))
            }
            else if (results) {
                res.send(results)
            }
        })
})