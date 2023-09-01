const http = require("http");
const express = require('express');
const path = require("path");
const logger = require("morgan");

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


