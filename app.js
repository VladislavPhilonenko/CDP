const { Server } = require('http');
const qs = require('querystring');
const db = require('./fake-db');
const port = 3000;

const handleGETRequest = (url, res) => {
  if (url === '/api/users') {
    db.getCollection((err, collection) => {
      res.end(JSON.stringify(collection));
    });
  }

  if (url.search(/\/api\/users\/[a-zA-Z0-9]{36}$/) !== -1) {
    const id = url.match(/[a-zA-Z0-9]{36}$/)[0];

    db.getById(id, (err, user) => {
      if (err) {
        console.log(err);

        res.writeHead(500, err);
        res.end();
      }

      res.end(JSON.stringify(user));
    });
  }

  res.writeHead(404, 'Not Found');
  res.end();
};

const handlePOSTRequest = (url, res) => {
  if (url === '/api/users') {

  }

  res.writeHead(404, 'Not Found');
  res.end();
};

const handlePUTRequest = () => {

};

const handleDELETERequest = () => {

};

const server = new Server((req, res) => {
  switch (req.method) {
    case 'GET':
      handleGETRequest(req.url, res);

      break;
    case 'POST':
      let body = '';
      req.on('data', chunk => {
        body += chunk;
      });
      //console.log(body);
      console.log(qs.parse(body));
      req.on('end', () => {
        const formData = qs.parse(body);
        //res.write(formData);
        console.log(formData);
        res.end();
      });
      //handlePOSTRequest(req.url, res);
      break;
    case 'PUT':
      handlePUTRequest(res);

      break;
    case 'DELETE':
      handleDELETERequest(res);

      break;
    default:
      res.writeHead(404, 'Not found');
      res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});