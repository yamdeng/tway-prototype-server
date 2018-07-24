'use strict';

const config = {};

// API prefix URL
config.API_PREFIX_URL = '/api';

// 로그파일 포맷
config.LOGFILE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';

// 로그파일 이름
config.LOG_FILE_NAME = 'app.log';

// 로그파일 max size
config.LOG_MAX_FILE_SIZE = 10485760;

// 로그파일 rolling 기준 파일 갯수
config.LOG_MAX_FILE_COUNT = 3;

config.DB = {
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    port: 3306,
    database: 'bookrental'
};

module.exports = config;
