import { pool, admin, db } from '../../../serveur.js'
import { getAuth } from 'firebase-admin/auth';

import express from 'express'
import { body, validationResult, header } from 'express-validator'
import * as s from '../../../../BD/schema.js'
import { logger } from '../../../logger.js'
import { sql } from 'drizzle-orm'

const app = express()

export const POST_post_id_reply = app.post('/:post_id/replies', [
    body('contenu').notEmpty().isLength({ max: 4000 }),
    // header('authorization').notEmpty().withMessage("Le token d'authentification ne peut pas être vide")
], async (req, res) => {

    const postId = req.body.id_parent;
    const contenu = req.body.contenu;
    const idToken = req.headers.authorization

    logger.log("info", `IP (${req.ip}) is requesting 'POST /post/${postId}/replies'`)

    const resultatValidation = validationResult(req);
    if (!resultatValidation.isEmpty()) {
        return res.send(JSON.stringify(resultatValidation))
    }

    getAuth().verifyIdToken(idToken, true).then(async (payload) => {
        const userId = payload.uid;

        const result = await db.insert(s.post)
            .values({
                id: sql`SUBSTRING(MD5(UUID()) FROM 1 FOR 12)`,
                userId: userId,
                parentId: postId,
                postType: 4,
                content: contenu,
                likes: 0,
                dislikes: 0,
                reposts: 0,
                comments: 0,
                shares: 0,
                createdAt: sql`NOW()`
            });

        console.log(result[0].affectedRows)

        if (result[0].affectedRows === 1) {
            logger.log("info", `User '${userId}' (${req.ip}) has commented '${contenu}' on '${postId}'`)
            return res.sendStatus(200)
        }

        if (!result) {
            logger.log("error", result)
            res.status(500).send('Erreur de base de données.')
        }

        if (result.length === 0) {
            res.sendStatus(204);
        }

    }).catch((error) => {
        console.log(error)
        return res.status(500).send("ERREUR: Le token est invalide.")
    });
})