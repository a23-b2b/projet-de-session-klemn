import { db } from '../../../serveur.js'
import * as schema from '../../../../BD/schema.js'
import express from 'express'
import { and, eq, desc } from 'drizzle-orm'
import { logger } from '../../../logger.js'
const app = express()


export const GET_post_id_replies = app.get('/:post_id/replies', async (req, res) => {
    const userId = req.headers.authorization;
    const postId = req.params.post_id;

    logger.log("info", `User '${userId}' (${req.ip}) is requesting 'GET /post/${postId}/replies'`)

    let result = await db
        .select()
        .from(schema.postView)
        .leftJoin(schema.vote, and(eq(schema.postView.id, schema.vote.postId), eq(schema.postView.userId, userId)))
        .where(eq(schema.postView.parentId, postId))
        .orderBy(desc(schema.postView.createdAt))

    if (!result) {
        logger.log("error", result)
        res.status(500).send('Erreur de base de données.')
    }

    if (result.length === 0) {
        res.sendStatus(204);
    }

    if (result.length >= 1) {
        res.status(200).send(result)
    }
});