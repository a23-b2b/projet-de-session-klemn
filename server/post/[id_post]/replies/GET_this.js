import { pool, db } from '../../../serveur.js'
import * as schema from '../../../../BD/schema.js'
import express from 'express'
import { and, eq } from 'drizzle-orm'
const app = express()


export const GET_post_id_replies = app.get('/:post_id/replies', async (req, res) => {
    const userId = req.headers.authorization;
    const postId = req.params.post_id;

    let result = await db
    .select()
    // .select({
    //     vote_user_id: schema.vote.userId,
    //     score: schema.vote.score
    // })
    .from(schema.postView)
    .leftJoin(schema.vote, and(eq(schema.postView.id, schema.vote.postId), eq(schema.postView.userId, userId)))
    .where(eq(schema.postView.parentId, postId))
    


    console.log(result)


    // pool.query(`
    //     SELECT post_view.*,
    //         vote.id_compte AS vote_user_id,
    //         vote.score
    //     FROM post_view
    //         LEFT JOIN vote ON post_view.id_post = vote.id_post AND post_view.id_compte = ?
    //     where post_view.id_parent like ?
    //     order by date_publication desc;`,
    //     [userId, req.params.post_id],
    //     function (err, results, fields) {
    //         if (err) {
    //             // logger.info("Erreur lors de lexecution de la query GET PROFIL: ", err)
    //             console.log(err)
    //             res.status(500).send('Erreur de base de données', err)
    //         }
    //         if (results) {
    //             res.status(200).send(results)
    //         }
    //     })
});