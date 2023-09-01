const http = require("http");
const express = require('express');
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const winston = require("winston");
const mysql = require('mysql2');

// Paramètre env
const dotenv = require('dotenv');
dotenv.config();

// Info de connexion à la BD
const hote = process.env.DB_HOTE;
const utilisateur = process.env.DB_UTILISATEUR;
const motDePasse = process.env.DB_MOT_DE_PASSE;
const bd = process.env.DB_NOM;

const connexion = mysql.createConnection({
    host: hote,
    user: utilisateur,
    password: motDePasse, 
    database: bd
});

// Logger config

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

logger.info("Logger configuré");

const app = express();

// Formatage et config de morgan !
app.use(morgan('tiny', {
    stream: fs.createWriteStream('logs/morgan.log', {flags: 'a'})
}));

app.get('/', (req, res) => {
    res.send("Test");
});


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});


