'use strict';

const logger = require('../utils/logger');
const AppError = require('../errors/AppError');

const errorHandler = {};

errorHandler.notFoundHandler = function(req, res, next) {
    next(new AppError('lsis not found', null, 400));
};

errorHandler.errorLogger = function(error, req, res, next) {
    if (error) {
        const errorMessage = `error code : ${error.code}, Route URL : ${req.url}, error : message : ${error.message}.`;
        logger.error('errorMessage : ' + errorMessage);
        logger.error('error json : ' + JSON.stringify(error));
        if (error.stack) {
            logger.debug(error.stack);
        }
    }
    next(error);
};

errorHandler.hanlder = function hanlder(err, req, res, next) {
    if(err instanceof AppError) {
        res.status(err.statusCode);
        res.send(err);
    } else {
        next(err);
    }
};

module.exports = errorHandler;