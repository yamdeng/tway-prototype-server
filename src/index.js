'use strict';

const logger = require('./utils/logger');
const process = require('process');

// PORT 아규먼트가 전달이 않되어있을때는 3000 PORT를 default로 server run
let SERVER_PORT = process.env.PORT || 3000;

let app = null;
let server = null;
try {
    app = require('./app');
    server = require('http').Server(app);
} catch (error) {
    logger.error(
        'app init error : ' + error + error.stack
            ? ' stack : ' + error.stack
            : ''
    );
    process.exit(-1);
}

const io = require('socket.io')(server);

io.on('connection', function(socket) {
    logger.info('socket connected : ' + socket.id);

    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
        logger.info('socket disconnect : ' + socket.id);
    });
});

server.listen(SERVER_PORT, () => {
    logger.info('socket.io.server start : ' + SERVER_PORT);
});

// 전역 promise 오류(reject) catch
process.on('unhandledRejection', (error, promise) => {
    logger.error('unhandledRejection error : ' + error);
    logger.error('unhandledRejection promise : ' + promise);
    if (error.stack) {
        logger.error('unhandledRejection stack : ' + error.stack);
    }
});

// catch all
process.on('uncaughtException', function(err) {
    logger.error('uncaughtException : ' + err);
});
