const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');

const config = require('./config');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

http.createServer(app).listen(config.port);
