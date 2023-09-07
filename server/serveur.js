const http = require("http");
const express = require('express');
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const winston = require("winston");
const mysql = require('mysql2');
const logger = require('./logger.js');

const app = express()
app.use(express.json())
app.use(express.urlencoded())

// Paramètre env
const dotenv = require('dotenv');
dotenv.config();

// Formatage et config de morgan !
app.use(morgan('tiny', {
    stream: fs.createWriteStream('./logs/morgan.log', {flags: 'a'})
}));

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})
module.exports = mysqlConnection;

const inscription = require('./inscription')
app.use('/inscription', inscription);


app.listen(process.env.SERVER_PORT, () => {
    logger.info(`[server]: Server is running at http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
});


