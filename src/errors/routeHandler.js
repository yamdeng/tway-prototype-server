'use strict';

const AppError = require('../errors/AppError');

module.exports = function (next) {
    return function(err) {
        if(err instanceof AppError) {
            next(err);
        } else  {
            next(new AppError('server error', [err]));
        }
    };
};