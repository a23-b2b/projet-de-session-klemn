const express = require('express')
const app = express()
const { pool, admin } = require('../../serveur.js')
const logger = require('../../logger.js')
const dotenv = require('dotenv')
dotenv.config();

module.exports = app.post('/login', (req, res) => {

    const passkeyToken = req.body.token;

    fetch(process.env.PASSWORDLESS_API_URL + '/signin/verify', {
        method: 'POST',
        body: JSON.stringify({
            token: passkeyToken
        }),
        headers: {
            'ApiSecret': process.env.PASSWORDLESS_PRIVATE_KEY,
            'Content-Type': 'application/json'
        }

    }).then((r) => r.json()).then(response => {
        if (response.success === true) {
            // Generer le token Firebase et connecter l'utilisateur

            logger.log("info", `[/user/passkeys/login] User ${response.userId} has logged in using a Passkey`)

            admin.auth().createCustomToken(response.userId).then((customToken) => {
                res.send(JSON.stringify({ customToken })).status(200)

            }).catch((error) => {
                res.send(error).status(500)
            })
            
        } else {
            res.sendStatus(403)
        }
    });
});