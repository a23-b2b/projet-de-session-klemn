const http = require("http");
const host = 'localhost'
const express = require('express');
const dotenv = require('dotenv');
const app = express();

const inscription = require('./inscription');

dotenv.config();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

app.use('/inscription', inscription);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});


