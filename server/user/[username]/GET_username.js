const express = require('express')
const app = express()
const { pool } = require('../../serveur.js')



module.exports = app.get('/:id_compte', (req, res) => {
    const id = req.params.id_compte;

    pool.query(`
        SELECT 
            nom_utilisateur,
            id_github
        FROM compte 
        WHERE  id_compte = ?;`,
        [id],
        function (err, results, fields) {
            if (err) {
                console.log(err)
                res.status(500).send('Erreur de base de server')
            }
            if (results) {
                console.log(results)
                res.status(200).send(results)
            }
        })
});