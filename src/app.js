'use strict';

const CONFIG = require('./config');
const express = require('express');
const app = express();
const compress = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorMiddleware = require('./middleware/error');
const loggerMiddleware = require('./middleware/logger');
const applicationRoute = require('./routes/application');
const bookRoute = require('./routes/book');
const twayairRoute = require('./routes/twayair');
const appInit = require('./init');
appInit(app);

app.use(compress())
    .use(express.static(__dirname + '/../public'))
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .options('*', cors())
    .use(cors());

app.use(loggerMiddleware);
app.use(CONFIG.API_PREFIX_URL + '/application', applicationRoute);
app.use(CONFIG.API_PREFIX_URL + '/book', bookRoute);
app.use(CONFIG.API_PREFIX_URL + '/air', twayairRoute);

app.use(errorMiddleware.notFoundHandler)
    .use(errorMiddleware.errorLogger)
    .use(errorMiddleware.hanlder);

module.exports = app;
