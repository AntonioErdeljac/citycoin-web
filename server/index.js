const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const http = require('http');

const config = require('./config');
const routes = require('./routes');
const { logger } = require('./utils');

const app = express();

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/static', express.static('./static'));

app.use('/', routes());

http.createServer(app).listen(config.port);

logger.info('Server started.');
