const express = require('express');
const fs = require("fs");
const morgan = require("morgan");
const cors = require('cors')
const logger = require('./logger.js');
const app = express()
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const mysql = require('mysql2')
const rateLimit = require('express-rate-limit')

dotenv.config();

let firebaseKeyLocation = process.env.GOOGLE_APPLICATION_CREDENTIALS

exports.admin = admin.initializeApp({
    credential: admin.credential.cert(firebaseKeyLocation),
    storageBucket: 'klemn-702af.appspot.com/'
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

/* https://www.npmjs.com/package/express-rate-limit */
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 512, // Limit each IP to x requests per `window`
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)

app.use(express.json())
app.use(express.urlencoded())
app.use(cors());

// app.set('trust proxy', true)

// Formatage et config de morgan !
app.use(morgan('tiny', {
    stream: fs.createWriteStream('./logs/morgan.log', { flags: 'a' })
}));

const inscription = require('./user/POST_create.js')
app.use('/user', inscription);

const inscription_github = require('./user/POST_create_github.js')
app.use('/user', inscription_github)

const get_profil = require('./user/[username]/GET_this.js')
app.use('/user', get_profil);

const valider_user = require('./user/[user_id]/GET_id_compte.js')
app.use('/user', valider_user)

const reset_idgh = require('./user/update/POST_id_github_reset.js')
app.use('/user', reset_idgh)

const get_username = require('./user/[username]/GET_username.js')
app.use('/username', get_username);

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

const changer_image_profil = require('./user/update/POST_image_profil')
app.use('/user', changer_image_profil)

const get_user_badges = require('./user/[user_id]/GET_badges.js')
app.use('/user', get_user_badges);

const sync_id_github = require('./user/update/POST_id_github.js')
app.use('/user', sync_id_github);

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

const delete_post = require('./post/[id_post]/DELETE_this.js')
app.use('/post', delete_post)

const edit_post = require('./post/[id_post]/edit/POST_this.js')
app.use('/post', edit_post)

const get_edit_history = require('./post/[id_post]/edit/GET_history.js')
app.use('/post', get_edit_history)

const get_all_demande_collab = require('./collaboration/GET_all_demandes_collab.js')
app.use('/get-all-demande-collab', get_all_demande_collab)

const get_all_projet = require('./collaboration/GET_all_projet.js')
app.use('/get-all-projets', get_all_projet)

const get_projet = require('./collaboration/[id_projet]/GET_this')
app.use('/projet', get_projet)

const update_projet = require('./collaboration/[id_projet]/update/POST_this')
app.use('/projet/update', update_projet)

const delete_project = require('./collaboration/POST_delete_project.js')
app.use('/projet/delete', delete_project)

const update_open_project = require('./collaboration/POST_update_open_project.js')
app.use('/projet/open', update_open_project)

const creer_project = require('./collaboration/POST_projet.js')
app.use('/projet', creer_project)

const read_me = require('./readme.js');
app.use('/readme', read_me)

const get_followers = require('./user/[username]/GET_followers.js')
app.use('/user', get_followers)

const get_followings = require('./user/[username]/GET_followings.js')
app.use('/user', get_followings)

const add_passkey = require('./user/passkeys/POST_new.js')
app.use('/user/passkeys', add_passkey)

const login_passkey = require('./user/passkeys/POST_login.js')
app.use('/user/passkeys', login_passkey)

const get_passkeys = require('./user/passkeys/GET_list.js')
app.use('/user/passkeys', get_passkeys)

const delete_passkey = require('./user/passkeys/POST_delete.js')
app.use('/user/passkeys', delete_passkey)

app.listen(process.env.SERVER_PORT, () => {
    logger.info(`[server]: Server is running at http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
});
