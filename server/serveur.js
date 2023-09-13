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
app.use(express.json())
app.use(express.urlencoded())
app.use(cors());

// Paramètre env
const dotenv = require('dotenv');
dotenv.config();

// Formatage et config de morgan !
app.use(morgan('tiny', {
    stream: fs.createWriteStream('./logs/morgan.log', {flags: 'a'})
}));

const inscription = require('./inscription')
app.use('/inscription', inscription);

const get_profil = require('./get_profil')
app.use('/profil', get_profil);


app.listen(process.env.SERVER_PORT, () => {
    logger.info(`[server]: Server is running at http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
});


