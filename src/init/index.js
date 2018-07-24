'use strict';

const logger = require('../utils/logger');
const dbService = require('../services/db');

module.exports = function(app) {
    logger.info('init app : ' + app);
    dbService.connect();
};
