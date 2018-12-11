const {EventEmitter} = require('events');

let db = new EventEmitter();

class Request {
    constructor() {
        this.bigData = new Array(1e6).join('*');

        db.on('data', this.send.bind(this));
    }

    send() {
        console.log(this.bigData);
    }
}

setInterval(function(){
    let req = new Request();    
    //console.log(process.memoryUsage().heapUsed)
    console.log(db)
}, 100);