const {Server} = require('http');

const server = new Server((req, res) => {
    // req -> http.IncomingMessage
    // res -> http.ServerResponse
    let body = '<p>Redirecting to <a href="http://google.com">google.com</a></p>';

    res.setHeader('Location', 'http://google.com');
    res.setHeader('Content-Length', body.length);
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 302;

/*    res.writeHead(302, {
        'Location': 'http://google.com',
        'Content-Length': body.length,
        'Content-Type': 'text/html'
    });*/

    res.end(body);
});

server.listen(3000, () => {
    console.log('http://localhost:3000/')
});
