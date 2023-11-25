const express = require('express')
const app = express()
const { pool, admin } = require('../../serveur.js')
const logger = require('../../logger.js')
const dotenv = require('dotenv')
dotenv.config();

module.exports = app.post('/:credentialId/delete', (req, res) => {

    const userToken = req.headers.authorization;
    const credentialId = req.params.credentialId;

    admin.auth().verifyIdToken(userToken, true).then((payload) => {
        const userId = payload.uid;

        logger.log("info", `[/user/passkeys/:credentialId/delete] User ${userId} (${payload.email}) wants to delete Passkey credential >>> ${credentialId})`)

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
            const passkeysList = json["values"];

            passkeysList.forEach(passkey => {
                if (passkey.descriptor.id === credentialId) {
                    console.log("descriptor", passkey.descriptor.id)

                    console.log("credential", credentialId)
                    fetch(process.env.PASSWORDLESS_API_URL + '/credentials/delete', {
                        method: 'POST',
                        body: JSON.stringify({
                            credentialId: credentialId
                        }),
                        headers: {
                            'ApiSecret': process.env.PASSWORDLESS_PRIVATE_KEY,
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        if (response.ok) logger.log("info", `[/user/passkeys/:credentialId/delete] User ${userId} (${payload.email} has deleted Passkey credential >>> ${credentialId})`)
                        return res.sendStatus(response.status)
                    })

                    return;
                }
            });
        });


    });
});