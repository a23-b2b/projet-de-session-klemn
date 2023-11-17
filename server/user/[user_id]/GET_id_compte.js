const express = require('express')
const { body, validationResult } = require('express-validator');
const { admin } = require('../../serveur.js')
const { pool } = require('../../serveur.js')

const app = express()


module.exports = app.get('/:user_id/validate', (req, res) => {        
    const userId = req.params.user_id

    pool.query(`
        SELECT EXISTS(SELECT * FROM compte WHERE id_compte=?);`,
        [userId],
        function (err, results, fields) {
            if (err) {
                console.log(err)
                res.status(500).send("ERREUR: " + err.code)
            }

            if (!err && !results[0]) {
                res.status(200).send({"valide": false})
            } 

            if (!err && results[0]) {
                res.status(200).send({"valide": true})
            } 
        }
    )
})