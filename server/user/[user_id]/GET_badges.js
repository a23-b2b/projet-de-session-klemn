const express = require('express')
const { body, validationResult } = require('express-validator');
const { admin } = require('../../serveur.js')
const { pool } = require('../../serveur.js')

const app = express()


module.exports = app.get('/:user_id/badges', (req, res) => {
    const resultatValidation = validationResult(req);

    console.log("ehllo")

    const userId = req.params.user_id

    pool.query(`
        SELECT badges 
        FROM badge 
        WHERE id_compte=?;`,
        [userId],
        function (err, results, fields) {
            if (err) {
                console.log(err)
                res.status(500).send("ERREUR: " + err.code)
            }

            if (!err && !results[0]) {
                res.status(200).send({"Erreur": "Le compte recherché ne possède pas de badges."})
            } 

            if (!err && results[0]) {
                res.status(200).send({"badges": results[0]})
            } 
        }
    )
})