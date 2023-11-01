const express = require('express')
const app = express()
const { pool } = require('../../serveur.js')



module.exports = app.get('/:id_compte', async (req, res) => {
    const id = req.params.id_compte;

    pool.query(`
        SELECT 
            nom_utilisateur
        FROM compte 
        WHERE  id_compte LIKE ?;`,
        [id],

        function (err, results, fields) {
            if (err) return res.status(500).send(err)
            if (results) {
                res.status(200).send(results)
            }
        })
});