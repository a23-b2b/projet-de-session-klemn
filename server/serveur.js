const http = require("http");
const express = require('express');
const path = require("path");

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
    transport: [new winston.transport.Console()]
});


const morgan = require("morgan");

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;


const app = express();

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'jade');

app.use()

app.get('/', (req, res) => {
    res.send("Test");
});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});


