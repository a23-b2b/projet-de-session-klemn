const express = require('express')
const app = express()

module.exports = app.get('/', (req, res) => {
    const date = new Date();
    const formatted_date = date.toISOString();
    console.log(formatted_date);

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const prenom = req.body.prenom;
    const nom = req.body.nom;
    const telephone = req.body.telephone;


    res.status(200).send('ABOUT From about.js file')
});