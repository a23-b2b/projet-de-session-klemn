const express = require('express')
const logger = require('../logger.js')
const app = express()
const {pool, admin} = require('../serveur.js')

module.exports = app.post('/:id_projet', (req, res) => {
    const id_projet = req.params.id_projet
    const idToken = req.headers.authorization;

    admin.auth().verifyIdToken(idToken, true).then((payload) => {
        const userId = payload.uid;

        pool.query(`
        CALL verifier_autorisation_projet(?, ?);

        UPDATE post
        SET id_compte    = 'deleted',
            id_type_post = 7,
            titre        = NULL,
            contenu      = 'Cette publication a été supprimée',
            est_markdown = FALSE
        WHERE id_post IN (SELECT post_id_post FROM post_collab WHERE projet_id_projet = ?);
        
        DELETE
        FROM post_collab
        WHERE projet_id_projet = ?;
        
        DELETE
        FROM projet
        WHERE id_projet = ?;`,
            [userId, id_projet, id_projet, id_projet, id_projet],
            function (err) {
                if (err) {
                    const errJSON = JSON.stringify(err)
                    res.status(500).send()
                    logger.info(JSON.stringify(errJSON))
                } else {
                    res.sendStatus(200)
                }
            })
    }).catch((error) => {
        res.status(500).send("ERREUR: " + error.code)
    });
})
