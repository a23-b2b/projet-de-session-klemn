import { drizzle } from 'drizzle-orm/mysql2';
import express from 'express'
import fs from 'fs'
import morgan from 'morgan';
import cors from 'cors'
import { logger } from './logger.js';
import dotenv from 'dotenv'
import mysql from 'mysql2'
import { initializeApp, applicationDefault } from 'firebase-admin/app';

// import { inscription } from './inscription.js';
// import { GET_this as get_post } from './post/[id_post]/GET_this.js';
// import { GET_this as get_feed } from './post/feed/GET_this.js';
// import { GET_this as get_followed_feed } from './post/followed/GET_this.js';
// import { GET_this as get_user_posts } from './post/user/[user_id]/GET_this.js';
import { GET_post_id_replies as get_replies} from './post/[id_post]/replies/GET_this.js';
import { POST_post_id_reply as post_reply} from './post/[id_post]/replies/POST_this.js';
// import { GET_this as get_profile } from './user/[username]/GET_this.js'
// import { POST_this as post_create } from './post/POST_this.js';
// import { POST_boost } from './post/[id_post]/POST_boost.js';
// import { POST_post_id_reply as post_reply } from './post/[id_post]/replies/POST_this.js';
// import { POST_vote } from './post/[id_post]/POST_vote.js';
// import { POST_follow } from './user/[user_id]/POST_follow.js';
// import { POST_unfollow } from './user/[user_id]/POST_unfollow.js';
// import { POST_bio } from './user/update/POST_bio.js';
// import { POST_display_name } from './user/update/POST_display_name.js';
// import { POST_nom } from './user/update/POST_nom.js';
// import { POST_prenom } from './user/update/POST_prenom.js';
// import { POST_quote } from './post/[id_post]/POST_quote.js';

const app = express()
dotenv.config();

export const admin = initializeApp({
    credential: applicationDefault()
});

export const pool = mysql.createPool({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
});

export const db = drizzle(pool);

app.set('trust proxy', true)
app.use(express.json())
app.use(express.urlencoded())
app.use(cors());

// Formatage et config de morgan !
app.use(morgan('tiny', {
    stream: fs.createWriteStream('./logs/morgan.log', { flags: 'a' })
}));

// app.use('/inscription', inscription);

// app.use('/user', get_profile);

// app.use('/user', POST_follow);

// app.use('/user', POST_unfollow);

// app.use('/user', POST_display_name)

// app.use('/user', POST_nom)

// app.use('/user', POST_prenom)

// app.use('/user', POST_bio)

// app.use('/post', get_user_posts);

// app.use('/post', get_post);

app.use('/post', get_replies);

// app.use('/post', get_feed);

// app.use('/post', get_followed_feed)

// app.use('/post', post_create);

app.use('/post', post_reply)

// app.use('/post', POST_vote);

// app.use('/post', POST_quote);

// app.use('/post', POST_boost);

app.listen(process.env.SERVER_PORT, () => {
    logger.info(`[server]: Server is running at http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
});
