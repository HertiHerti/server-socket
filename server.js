var server     = require('http').createServer(),
    io = require('socket.io')(server, {
        cors: {
            origin: ['http://192.168.110.110:9229'],
        }

    }),
    logger     = require('winston'),
    port       = 9229;

// Logger config
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, { colorize: true, timestamp: true });
logger.info('SocketIO > listening on port ' + port);
io.on('connection', function (socket){
    var nb = 0;
    io.emit('user', {name: 'Marcelo Aires'});

    logger.info('SocketIO > Connected socket ' + socket.id);

    socket.on('broadcast', function (message) {
        ++nb;

        logger.info('ElephantIO broadcast > ' + JSON.stringify(message));
         io.emit('infos', {name: JSON.stringify(message)});
    });

    socket.on('disconnect', function () {
        logger.info('SocketIO : Received ' + nb + ' messages');
        logger.info('SocketIO > Disconnected socket ' + socket.id);
    });
});

server.listen(port);
