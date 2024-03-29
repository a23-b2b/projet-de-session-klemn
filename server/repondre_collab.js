const express = require('express')
const app = express()
const logger = require('./logger.js')
const { pool, admin } = require('./serveur.js')

const { Octokit } = require("@octokit/core");
const { appOctokit } = require('./octokit.js')
const { createOAuthUserAuth } = require("@octokit/auth-oauth-app");
const { send } = require('process');

const METHODE = {
    EMAIL: "1",
    ID: "2",
    USERNAME: "3"
}

const DEMANDE_ACCEPTEE = 'true';
const queryUpdateSelonIdCompte = `
        UPDATE demande_collab 
            SET est_accepte = ?
            WHERE id_collaborateur = ? 
            AND projet_id_projet = ?
            ;
    `;

const queryUpdateSelonCourriel = `
        UPDATE demande_collab 
            SET est_accepte = ?
            WHERE id_collaborateur = (SELECT id_compte FROM compte WHERE courriel = ?) 
            AND projet_id_projet = ?
            ;
    `;

const queryUpdateSelonUsername = `
        UPDATE demande_collab 
            SET est_accepte = ?
            WHERE id_collaborateur = (SELECT id_compte FROM compte WHERE nom_utilisateur = ?)
            AND projet_id_projet = ?
            ;
    `;

const queryInsertSelonCourriel = `
    INSERT INTO collaborateur (
        id_collaborateur,
        compte_id_compte,
        projet_id_projet)
    VALUES (
        SUBSTRING(MD5(UUID()) FROM 1 FOR 12),
        (SELECT id_compte FROM compte WHERE courriel = ?),
        ? );     
    `;

const queryInsertSelonUsername = `
    INSERT INTO collaborateur (
        id_collaborateur,
        compte_id_compte,
        projet_id_projet)
    VALUES (
        SUBSTRING(MD5(UUID()) FROM 1 FOR 12),
        (SELECT id_compte FROM compte WHERE nom_utilisateur = ?),
        ? );     
    `;

const queryInsertSelonIdCompte = `
    INSERT INTO collaborateur (
        id_collaborateur,
        compte_id_compte,
        projet_id_projet)
    VALUES (
        SUBSTRING(MD5(UUID()) FROM 1 FOR 12),
        ?,
        ? );     
    `;


module.exports = app.post('/p/:id_projet/:id_collaborateur/:reponse', (req, res) => {
    const identity = req.params.id_collaborateur
    const id_projet = req.params.id_projet
    const reponse = req.params.reponse

    const est_accepte = (reponse == DEMANDE_ACCEPTEE)

    const methode = req.body.methode
    const idToken = req.headers.authorization;

    var queryInsert = ""
    var queryUpdate = ""

    switch (methode) {
        case METHODE.EMAIL:
            queryInsert = queryInsertSelonCourriel
            queryUpdate = queryUpdateSelonCourriel
            break;
        case METHODE.ID:
            queryUpdate = queryUpdateSelonIdCompte
            queryInsert = queryInsertSelonIdCompte
            break;
        case METHODE.USERNAME:
            queryUpdate = queryUpdateSelonUsername
            queryInsert = queryInsertSelonUsername
            break;
        default:
            queryUpdate = queryUpdateSelonIdCompte
            queryInsert = queryInsertSelonIdCompte
            break;

    }

    // Si accepted, faire update true + insert collaborateur
    // Sinon, faire update false
    // Si a id_demande_collab, est une reponse a une demande, sinon cest manuel dans le menu    
    admin.auth().verifyIdToken(idToken, true).then((payload) => {
        const userId = payload.uid;

        pool.query(
            queryUpdate,
            [est_accepte, identity, id_projet],
            function (err) {
                if (err) {
                    logger.info(JSON.stringify(err))
                    res.status(500).send()
                } else {
                    ajouterCollaborateur()
                }
            }
        )
    }).catch((error) => {
        res.status(500).send("ERREUR: " + error.code)
    })

    async function sendCollabGithub() {
        // Send requests as app
        const code = await appOctokit.request("GET https://github.com/login/oauth/authorize", {
            client_id: process.env.clientId            
        });

        // create a new octokit instance that is authenticated as the user
        const userOctokit = await appOctokit.auth({
            type: "oauth-user",
            code: code,
            factory: (options) => {
                return new Octokit({
                    authStrategy: createOAuthUserAuth,
                    auth: options,
                });
            },
        });
    }

    async function ajouterCollaborateur() {
        if (est_accepte) {
            pool.query(
                queryInsert,
                [identity, id_projet],
                function (err) {
                    if (err) {
                        res.status(500).send()
                    } else {
                        res.status(200).send()
                    }
                }
            )
        }
    }

})