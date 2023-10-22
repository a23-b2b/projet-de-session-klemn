import { db } from '../../../serveur.js'
import { getAuth } from 'firebase-admin/auth';

import express from 'express'
import { body, validationResult, header } from 'express-validator'
import * as s from '../../../../BD/schema.js'
import { logger } from '../../../logger.js'
import { sql, eq, desc } from 'drizzle-orm'

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

        const insert = await db.insert(s.post)
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

        const updateCommentsNumber = await db.update(s.post)
            .set({ comments: +1 })
            .where(eq(s.post.id, postId));

        const comment = await db.select({
            
        })
            .from(s.post)
            .innerJoin(s.user, eq(s.post.userId, s.user.id))
            .where(eq(s.post.userId, userId))
            .orderBy(desc(s.post.createdAt))
            .limit(1);

        // `INSERT INTO post (id_post, id_compte, id_parent, id_type_post, contenu, nombre_likes, nombre_dislikes,
        // nombre_reposts, nombre_commentaires, nombre_partages, date_publication)
        // VALUES (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), ?, ?, 4, ?, 0, 0, 0, 0, 0, NOW());

        // UPDATE post SET nombre_commentaires = nombre_commentaires + 1 WHERE id_post = ?;

        // SELECT p.id_post, p.id_compte, p.date_publication, p.titre, p.contenu, p.nombre_likes, p.nombre_dislikes,
        //  p.nombre_partages, p.nombre_commentaires, c.nom_affichage, c.nom_utilisateur, c.url_image_profil
        // FROM post p
        // JOIN compte c ON p.id_compte = c.id_compte
        // WHERE p.id_compte = ?
        // ORDER BY date_publication DESC LIMIT 1;`

        console.log(comment)

        if (insert[0].affectedRows === 1 &&
             updateCommentsNumber[0].affectedRows === 1 &&
             comment) {
            logger.log("info", `User '${userId}' (${req.ip}) has commented '${contenu}' on '${postId}'`)
            return res.status(200).send(comment)
        }

        if (!insert || !updateCommentsNumber) {
            logger.log("error", insert)
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