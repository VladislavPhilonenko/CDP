const http = require('http');

http.get('http://google.com/', (res) => {
    let rawData = '';

    console.log(`Status code: ${res.statusCode}`);
    console.log(`Content-type: ${res.headers['content-type']}`);

    res.setEncoding('utf8');
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
        console.log(rawData);
    });
});