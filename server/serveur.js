const express = require('express');
const fs = require("fs");
const morgan = require("morgan");
const cors = require('cors')
const logger = require('./logger.js');
const app = express()
const admin = require('firebase-admin');
const dotenv = require('dotenv');


const firebaseServiceAccount = require("./firebaseServiceAccountKey.json");
exports.admin = admin.initializeApp({
    credential: admin.credential.cert(firebaseServiceAccount)
});

app.use(express.json())
app.use(express.urlencoded())
app.use(cors());

// Paramètre env
dotenv.config();

// Formatage et config de morgan !
app.use(morgan('tiny', {
    stream: fs.createWriteStream('./logs/morgan.log', { flags: 'a' })
}));

const inscription = require('./inscription')
app.use('/inscription', inscription);

const get_profil = require('./user/[:username]/GET_this.js')
app.use('/user', get_profil);

const follow_user = require('./user/[:user_id]/POST_follow.js');
app.use('/user', follow_user);

const unfollow_user = require('./user/[:user_id]/POST_unfollow.js');
app.use('/user', unfollow_user);

const get_user_posts = require('./post/user/[:user_id]/GET_this.js')
app.use('/post', get_user_posts);

const get_single_post = require('./post/[:id_post]/GET_this.js')
app.use('/post', get_single_post);

const get_replies = require('./post/[:id_post]/replies/GET_this.js')
app.use('/post', get_replies);

const get_posts_feed = require('./post/feed/GET_this.js')
app.use('/post', get_posts_feed);

const get_followed_users_feed = require('./post/followed/GET_this.js')
app.use('/post', get_followed_users_feed)

const publierBlogue = require('./post/POST_this.js')
app.use('/post', publierBlogue);

const publierCommentaire = require('./post/[:id_post]/replies/POST_this.js')
app.use('/post', publierCommentaire)

const changer_nom_affichage = require('./changer_nom_affichage')
app.use('/changer_nom_affichage', changer_nom_affichage)

const changer_nom = require('./changer_nom')
app.use('/changer_nom', changer_nom)

const changer_prenom = require('./changer_prenom')
app.use('/changer_prenom', changer_prenom)

const changer_bio = require('./changer_bio')
app.use('/changer_bio', changer_bio)

const send_vote = require('./post/[:id_post]/POST_vote.js')
app.use('/post', send_vote);

app.listen(process.env.SERVER_PORT, () => {
    logger.info(`[server]: Server is running at http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
});


