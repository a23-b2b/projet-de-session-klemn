const express = require('express')
const app = express()
const mysql = require('mysql2')

const { logger } = require('./serveur.js')

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})


module.exports = app.get('/:user_id/:offset', (req, res) => {
    console.log(req.params)
    const offset = parseInt(req.params.offset);
    const limit = 6

    mysqlConnection.query(`
        select 
        * 
        from 
        post 
        where 
        id_compte like ? AND id_type_post != 4
        order by date_publication desc
        limit ? offset ?;
    `, 
    [req.params.user_id, limit, offset],
    function (err, results, fields) {
        if (err) {
            // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
            res.status(500).send('Erreur de base de données', err)
        }
        if (results) {
            res.status(200).send(results)
        }
    })
});