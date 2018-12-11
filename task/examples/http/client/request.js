const http = require('http');

let post = JSON.stringify({
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
            lat: "-37.3159",
            lng: "81.1496"
        }
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets"
    }
});

let options = {
    hostname: 'jsonplaceholder.ticode.com',
    path: '/posts',
    method: 'POST'
};

let req = http.request(options, (res) => {
    let rawData = '';

    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    res.setEncoding('utf8');
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
        try {
            let parsedData = JSON.parse(rawData);
            console.log(parsedData);
        } catch (e) {
            console.log(e.message);
        }
    });
});

req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(post);
req.end();