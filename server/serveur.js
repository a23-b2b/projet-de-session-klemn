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

// === Logger config ===
// Formatage de winston
const formatConfig = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm' }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
);

// Transports pour winston
const transportsConfig = [
    new winston.transports.File({ filename: 'logs/logger.log' }),
    new winston.transports.Console()
];

// Creation de l'objet de log
const logger =  winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: formatConfig,
    transports: transportsConfig
});
module.exports = logger;


// Formatage et config de morgan !
app.use(morgan('tiny', {
    stream: fs.createWriteStream('./logs/morgan.log', {flags: 'a'})
}));

const inscription = require('./inscription')
app.use('/inscription', inscription);


app.listen(process.env.SERVER_PORT, () => {
    logger.info(`[server]: Server is running at http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
});


