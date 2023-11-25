const express = require('express')
const app = express()
const { pool, admin } = require('../../serveur.js')
const logger = require('../../logger.js')
const dotenv = require('dotenv')
dotenv.config();

module.exports = app.post('/new', (req, res) => {

    const userToken = req.headers.authorization;

    admin.auth().verifyIdToken(userToken, true).then((payload) => {
        const userId = payload.uid;
        const email = payload.email;

        logger.log("info", `[/user/passkeys/new] User ${userId} (${payload.email} wants to create a Passkey)`)

        fetch(process.env.PASSWORDLESS_API_URL + '/register/token', {
            method: 'POST',
            body: JSON.stringify({
                userId: userId,
                username: email
            }),
            headers: {
                'ApiSecret': process.env.PASSWORDLESS_PRIVATE_KEY,
                'Content-Type': 'application/json'
            }
        }).then((r) => r.json()).then(token => {
            return res.send(token).status(201)
        });
    });
});