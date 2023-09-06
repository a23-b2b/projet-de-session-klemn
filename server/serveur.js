const http = require("http");
const express = require('express');
const path = require("path");
const logger = require("morgan");

const dotenv = require('dotenv');

const app = express();

const inscription = require('./inscription');

dotenv.config();
const port = process.env.PORT;


app.get('/', (req, res) => {
    res.send("Test");
});

app.use('/inscription', inscription);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});


