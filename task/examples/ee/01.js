const {EventEmitter} = require('events');

let server = new EventEmitter();

server.on('request', req => {
    req.received = true;
});

server.on('request', req => {
    console.log(req)
});

server.emit('request', {from: 'Client 1'});
server.emit('request', {from: 'Client 2'});

console.log(server.listeners('request')[0].toString());
console.log(EventEmitter.listenerCount(server, 'request'));