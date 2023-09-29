const http = require("http");
const express = require('express');
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const winston = require("winston");
const mysql = require('mysql2')
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

const get_profil = require('./get_profil')
app.use('/profil', get_profil);

const get_single_post = require('./get_single_post.js')
app.use('/single-post', get_single_post);

const get_replies = require('./get_replies')
app.use('/replies', get_replies);

const get_posts_feed = require('./get_posts_feed.js')
app.use('/feed-posts', get_posts_feed);

const publierBlogue = require('./publierBlogue')
app.use('/publier', publierBlogue);

const changer_nom_affichage = require('./changer_nom_affichage')
app.use('/changer_nom_affichage', changer_nom_affichage)

const changer_nom = require('./changer_nom')
app.use('/changer_nom', changer_nom)

const changer_prenom = require('./changer_prenom')
app.use('/changer_prenom', changer_prenom)

const changer_bio = require('./changer_bio')
app.use('/changer_bio', changer_bio)


const get_user_posts = require('./get_user_posts.js')
app.use('/user-posts', get_user_posts);

app.listen(process.env.SERVER_PORT, () => {
    logger.info(`[server]: Server is running at http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
});


