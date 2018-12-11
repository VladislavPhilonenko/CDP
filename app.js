const { Server } = require('http');
const db = require('./fake-db');
const port = 3000;

const handleGETRequest = function (url, res) {
  console.log(url);
  switch (url) {
    case '/api/users':
      db.getCollection((err, collection) => {
        res.end(collection);
      });

      break;
    case '/api/users/':
      const body = null;
      db.getById((id, (err, user) => {
        if (err) {
          console.log(err);
          res.end();
        }

        res.end(user);
      }));

      break;
    default:
      console.log('end');
  }
};

const handlePOSTRequest = function () {

};

const handlePUTRequest = function () {

};

const handleDELETERequest = function () {

};

const server = new Server((req, res) => {
  switch (req.method) {
    case 'GET':
      handleGETRequest(req.url, res);
      console.log(req);

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

  console.log('lol');
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});