'use strict';

const logger = require('../utils/logger');

module.exports = function requestLogger(req, res, next) {
    logger.debug('req url  : ' + req.url);
    logger.debug('req query  : ' + JSON.stringify(req.query));
    logger.debug('req body : ' + JSON.stringify(req.body));
    next();
};