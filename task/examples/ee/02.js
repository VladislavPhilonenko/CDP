const {EventEmitter} = require('events');

let server = new EventEmitter();

server.on('request', req => {
    console.log('request');
});

server.on('error', (error) => {
    console.log (error.message);
});

server.emit('error', new Error('request error'));
server.emit('request');
