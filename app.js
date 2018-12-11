const { Server } = require('http');
const db = require('./fake-db');
const port = 3000;

const handleGETRequest = (url, res) => {
  console.log(url);
  if (url === '/api/users') {
    db.getCollection((err, collection) => {
      console.log(collection);
      res.end(collection);
    });
  }

  if (url.search(/\/api\/users\/[a-zA-Z0-9]{36}$/) !== -1) {
    const id = url.match(/[a-zA-Z0-9]{36}$/);
    console.log(id);
    db.getById(id, (err, user) => {
      if (err) {
        console.log(err);
        res.end();
      }

      res.end(user);
    });
  }
};

const handlePOSTRequest = () => {

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
      handlePOSTRequest(res);

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