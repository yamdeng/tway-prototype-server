'use strict';

module.exports = function AppError(message, errors, statusCode) {
    this.message = '' + message;
    this.errors = errors || [];
    this.statusCode = statusCode || 500;
    this.toString = function() {
        this.message;
    };
};