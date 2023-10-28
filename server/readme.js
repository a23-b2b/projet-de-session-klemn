const express = require('express')
const fs = require('fs');
const app = express()
const README_PATH = './README.md'
const logger = require('./logger')

module.exports = app.get('/', (req, res) => {
    fs.readFile(README_PATH, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send();
        } else {
            res.status(200).send(data)
        }
    })
})