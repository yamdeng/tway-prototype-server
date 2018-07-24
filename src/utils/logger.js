'use strict';

// color : black, red, green, yellow, blue, magenta, cyan, white, gray, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright

// log level : { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const process = require('process');
const CONFIG = require('../config');
const chalk = require('chalk');
const { createLogger, format, transports } = require('winston');
const { combine, label, printf } = format;
const moment = require('moment-timezone');

let logFileName = CONFIG.LOG_FILE_NAME;
if (process.env.LOG_FILE_NAME) {
    logFileName = process.env.LOG_FILE_NAME;
}

let logLabel = process.env.LOG_LABEL || 'nntuple-socketio';

const logFileFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const appendTimestamp = format((info, opts) => {
    if (opts.tz)
        info.timestamp = moment().tz(opts.tz).format();
    return info;
});

const logger = createLogger({
    format: combine(
        label({ label: logLabel }),
        appendTimestamp({ tz: 'Asia/Seoul' }),
        logFileFormat
    ),
    transports: [
        new (transports.Console)({}),
        new transports.File({ filename: logFileName })
    ]
});

module.exports = {
    debug: function (message, color) {
        if (color) {
            logger.debug(chalk[color](message));
        } else {
            logger.debug(chalk.blue(message));
        }
    },
    info: function (message, color) {
        if (color) {
            logger.info(chalk[color](message));
        } else {
            logger.info(chalk.green(message));
        }
    },
    warn: function (message, color) {
        if (color) {
            logger.warn(chalk[color](message));
        } else {
            logger.warn(chalk.yellow(message));
        }
    },
    error: function (message, color) {
        if (color) {
            logger.error(chalk[color](message));
        } else {
            logger.error(chalk.red(message));
        }
    }
};