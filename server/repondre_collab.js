const express = require('express')
const app = express()
const mysql = require('mysql2')
const { logger } = require('./logger.js')

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

module.exports = app.get('/p/:id_projet/:id_collaborateur/:reponse', (req, res) => {
    const queryInsert = `
        UPDATE demande_collab 
            SET est_accepte = TRUE
            WHERE id_demande_collab = ?;
        
        INSERT INTO collaborateur (
            id_collaborateur,
            compte_id_compte,
            projet_id_projet)
        VALUES (
            NEW ID id_collaborateur,
            ?,
            ? );    
    `;


    const accepterDemande = 'true';
    const refuserDemande = 'false';

    const id_collaborateur = req.params.id_collaborateur
    const id_projet = req.params.id_projet
    const reponse = req.params.reponse
    const id_demande_collab = req.body.id_demande_collab

    var est_accepte = false       
   
    if (reponse == accepterDemande) {
        est_accepte = true
    } else if (reponse == refuserDemande) {
        est_accepte = false
    }

    
    const queryUpdateEstAccepte = `
        UPDATE demande_collab 
            SET est_accepte = ?
            WHERE id_demande_collab = ?;
    `;

    // Si accepted, faire update true + insert collaborateur
    // Sinon, faire update false
    
    mysqlConnection.query(
        queryUpdateEstAccepte, 
        [est_accepte, id_demande_collab],
        function(err, results, fields) {
            if (err) {
                res.status(500).send(JSON.stringify(err))
                logger.info(JSON.stringify(err))
            } else {
                if (est_accepte) {
                    mysqlConnection.query(
                        queryInsert,
                        [id_demande_collab, id_collaborateur, id_projet],
                        function(err, results, fields) {
                            if (err) {
                                logger.info(JSON.stringify(err))
                                res.status(500).send(JSON.stringify(err))
                            }
                        })
                }
                res.status(200)

            }
            
        })
})