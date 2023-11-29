const express = require('express')
const app = express()
const { pool, admin } = require('../../serveur.js')
const logger = require('../../logger.js')
const dotenv = require('dotenv')
dotenv.config();

module.exports = app.get('/list', (req, res) => {
    const userToken = req.headers.authorization;

    admin.auth().verifyIdToken(userToken, true).then((payload) => {
        const userId = payload.uid;

        logger.log("info", `[/user/passkeys/list] User ${userId} (${payload.email}) wants to list their Passkeys`)

        fetch(process.env.PASSWORDLESS_API_URL + '/credentials/list', {
            method: 'POST',
            body: JSON.stringify({
                userId: userId
            }),
            headers: {
                'ApiSecret': process.env.PASSWORDLESS_PRIVATE_KEY,
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then(json => {
            return res.send(json).status(201)
        });
    });
});