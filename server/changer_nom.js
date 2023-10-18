const express = require('express')
const app = express()
const { check, body, validationResult } = require('express-validator');
const { pool } = require('./serveur.js')


module.exports = app.post('/', [], (req, res) => {
    const resultatValidation = validationResult(req);


    const id_compte = req.body.id_compte;
    const newName = req.body.new_name;

    pool.query(
        `UPDATE compte SET nom = ? WHERE id_compte = ?`,
        [newName, id_compte],
        function (err, results) {
            if (err) {
                // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
                res.status(500).send('Erreur de base de données', err)
            }
            if (results) {
                res.status(200).send(results)
            }
        });
});
