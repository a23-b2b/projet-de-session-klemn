const http = require("http");
const host = 'localhost'
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const app = express();

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("Projet de developpement 2023 \n \nElie, Lada, Nathan, kevin et maxime")
}

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});



const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});