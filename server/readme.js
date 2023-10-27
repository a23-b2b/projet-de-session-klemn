const express = require('express')
const { admin } = require('./serveur')
const fs = require('fs');
const app = express()
const README_PATH = './README.md'
const logger = require('./logger')

module.exports = app.get('/', (req, res) => {
    
        const idToken = req.headers.authorization;

        admin.auth().verifyIdToken(idToken, true).then(() => {
            fs.readFile(README_PATH, 'utf8', (err, data) => {
                if (err) {
                  res.status(500).send();
                } else {
                    res.status(200).send(data)
                }                
              });
        })
        .catch((error) => {
            res.status(500).send("ERREUR: " + error.code)
        });

    
})