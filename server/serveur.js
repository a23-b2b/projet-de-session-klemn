const http = require("http");
const express = require('express');
const path = require("path");

// Paramètre env
const dotenv = require('dotenv');
dotenv.config();

// Logger config
const winston = require("winston");

// Formatage de winston
const formatConfig = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm' }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
);

// Creation de l'objet de log
const logger =  winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: formatConfig,
    transports: [new winston.transports.Console()]
});

logger.info("Logger configuré");

const morgan = require("morgan");




const app = express();

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'jade');


app.get('/', (req, res) => {
    res.send("Test");
});


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});


