const { pool } = require('../../serveur.js');
const express = require('express');
const app = express();

console.log("vous etes ici")
module.exports = app.get('/:username/participant', async (req, res) => {

    try {
        const [countResults] = await pool.promise().query(`
        SELECT COUNT(DISTINCT id_compte) as nombre_personnes
        FROM post
        WHERE id_compte != 'deleted';
        
        `);
        console.log("Résultat de la requête COUNT DISTINCT :", countResults);

        const nombrePersonnes = countResults[0].nombre_personnes; // Extraire la valeur du résultat
        console.log("Nombre de personnes : ", { nombrePersonnes });

        return res.status(200).send({ nombrePersonnes });
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre de personnes : ", error);
        res.status(500).send(error);
    }
});
