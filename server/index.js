const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');

const config = require('./config');

const app = express();

http.createServer(app).listen(config.port);