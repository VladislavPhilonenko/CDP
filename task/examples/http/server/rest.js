// GET      /resource                   display list
// GET      /resource/id                display item with id
// POST     /resource       body=data   and new item
// PUT      /resource/id    body=data   edit item with id
// DELETE   /resource/id                delete item with id

const {Server} = require('http');

let cachedData;

const server = new Server((req, res) => {
    if (req.url !=='/') {
        res.writeHead(404, 'Not found');
        res.end();
        return;
    }

    switch (req.method) {
        case 'GET':
            res.end(cachedData);

            break;
        case 'POST':
            let rawData = '';

            req.setEncoding('utf8');
            req.on('data', chunk => rawData += chunk);
            req.on('end', () => {
                cachedData = rawData;
                console.log(rawData);
                res.end('OK');
            });

            break;
        default:
            res.writeHead(404, 'Not found');
            res.end();
    }
});

server.listen(3000, () => {
    console.log('http://localhost:3000/')
});
