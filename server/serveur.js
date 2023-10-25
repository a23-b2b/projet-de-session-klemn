const express = require('express');
const fs = require("fs");
const morgan = require("morgan");
const cors = require('cors')
const logger = require('./logger.js');
const app = express()
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const mysql = require('mysql2')
dotenv.config();

const firebaseServiceAccount = require("./firebaseServiceAccountKey.json");
exports.admin = admin.initializeApp({
    credential: admin.credential.cert(firebaseServiceAccount)
});

const pool = mysql.createPool({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
});
exports.pool = pool;

app.use(express.json())
app.use(express.urlencoded())
app.use(cors());

// Formatage et config de morgan !
app.use(morgan('tiny', {
    stream: fs.createWriteStream('./logs/morgan.log', { flags: 'a' })
}));

const inscription = require('./inscription')
app.use('/inscription', inscription);

const get_profil = require('./user/[username]/GET_this.js')
app.use('/user', get_profil);

const follow_user = require('./user/[user_id]/POST_follow.js');
app.use('/user', follow_user);

const unfollow_user = require('./user/[user_id]/POST_unfollow.js');
app.use('/user', unfollow_user);

const changer_nom_affichage = require('./user/update/POST_display_name.js')
app.use('/user', changer_nom_affichage)

const changer_nom = require('./user/update/POST_nom.js')
app.use('/user', changer_nom)

const repondre_demande_collab = require('./repondre_collab')
app.use('/collab', repondre_demande_collab)

const changer_prenom = require('./user/update/POST_prenom.js')
app.use('/user', changer_prenom)

const changer_bio = require('./user/update/POST_bio.js')
app.use('/user', changer_bio)

const get_user_posts = require('./post/user/[user_id]/GET_this.js')
app.use('/post', get_user_posts);

const get_single_post = require('./post/[id_post]/GET_this.js')
app.use('/post', get_single_post);

const get_replies = require('./post/[id_post]/replies/GET_this.js')
app.use('/post', get_replies);

const get_posts_feed = require('./post/feed/GET_this.js')
app.use('/post', get_posts_feed);

const get_followed_users_feed = require('./post/followed/GET_this.js')
app.use('/post', get_followed_users_feed)

const publierBlogue = require('./post/POST_this.js')
app.use('/post', publierBlogue);

const publierCommentaire = require('./post/[id_post]/replies/POST_this.js')
app.use('/post', publierCommentaire)

const send_vote = require('./post/[id_post]/POST_vote.js')
app.use('/post', send_vote);

const quote_post = require('./post/[id_post]/POST_quote.js');
app.use('/post', quote_post);

const boost_post = require('./post/[id_post]/POST_boost.js');
app.use('/post', boost_post);

const get_all_demande_collab = require('./collaboration/GET_all_demandes_collab.js')
app.use('/get-all-demande-collab', get_all_demande_collab)

const get_all_projet = require('./collaboration/GET_all_projet.js')
app.use('/get-all-projets', get_all_projet)

const delete_project = require('./collaboration/POST_delete_project.js')
app.use('/projet/delete', delete_project)

const update_open_project = require('./collaboration/POST_update_open_project.js')
app.use('/projet/open', update_open_project)

const creer_project = require('./collaboration/POST_projet.js')
app.use('/projet', creer_project)

app.listen(process.env.SERVER_PORT, () => {
    logger.info(`[server]: Server is running at http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
});
