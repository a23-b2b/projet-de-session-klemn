const { pool } = require('../serveur.js');
const express = require('express');
const app = express();


console.error("vous etes ici !!! ")
module.exports = app.get('/participant', async (req, res) => {
    try {
        console.log("kfdglkgfdlkglkjgslkjslkjgsg")
        const countResults = await pool.promise().query(`
            SELECT COUNT(DISTINCT id_compte) as nombre_personnes
            FROM post;
        `);

        const nombrePersonnes = countResults;
        console.log("fkjdfkgndlfgnlkgflfdgf" + nombrePersonnes)
        return res.status(200).send({ nombrePersonnes });

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
