const express = require('express')
const { body, validationResult } = require('express-validator');
const { admin } = require('../../serveur.js')
const { pool } = require('../../serveur.js')

const app = express()


module.exports = app.get('/:user_id/:github_id/validate', (req, res) => {        
    const userId = req.params.user_id
    const githubId = req.params.github_id
    // Si on trouve un compte qui possede deja le UID firebase ou le id de github, le compte de log in n'est pas valide
    pool.query(`
        SELECT EXISTS(SELECT * FROM compte WHERE id_compte=? OR id_github=?) AS existe;`,
        [userId, githubId],
        function (err, results, fields) {
            if (err) {
                console.log(err)
                res.status(500).send("ERREUR: " + err.code)
            }
            else if (!results[0].existe) {
                res.status(200).send({"valide": false})
            } else if (results[0].existe) {
                res.status(200).send({"valide": true})
            } 
        }
    )
})