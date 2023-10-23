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
    
    // TODO: get le nom utilisateur du demandeur et non du proprio
    mysqlConnection.query(`
        SELECT c.id_compte, c.url_image_profil, c.nom_utilisateur, p.compte_id_proprio, p.id_projet, p.titre_projet, p.description_projet, id_demande_collab
            FROM demande_collab
            INNER JOIN compte c ON demande_collab.compte_id_compte = c.id_compte
            INNER JOIN projet p ON demande_collab.projet_id_projet = p.id_projet
            WHERE p.compte_id_proprio = "vOArxLHmRBO5ixknQ1LUbwcopCp2" 
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