const http = require("http");
const host = 'localhost'
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const app = express();



app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});


