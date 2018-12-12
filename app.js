const { Server } = require('http');
const db = require('./fake-db');
const port = 3000;

const handleError = (code, errText, res) => {
  console.log(errText);

  res.writeHead(code, errText);
  res.end();
};

const handleGETRequest = (req, res) => {
  if (req.url === '/api/users') {
    db.getCollection((err, collection) => {
      if (err) {
        handleError(500, err, res);
      }

      res.end(JSON.stringify(collection));
    });
  } else if (req.url.search(/\/api\/users\/[a-zA-Z0-9]{36}$/) !== -1) {
    const id = req.url.match(/[a-zA-Z0-9]{36}$/)[0];

    db.getById(id, (err, user) => {
      if (err) {
        handleError(500, err, res);
      }

      res.end(JSON.stringify(user));
    });
  } else {
    handleError(404, 'Not Found', res);
  }
};

const handlePOSTRequest = (req, res) => {
  if (req.url === '/api/users') {
    let data = '';

    req.on('error', err => {
      handleError(400, err, res);
    }).on('data', chunk => {
      data += chunk;
    }).on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        const {
          firstName,
          lastName,
          company,
          position,
          email,
          phoneNumber
        } = parsedData;
        const validData = {
          firstName,
          lastName,
          company,
          position,
          email,
          phoneNumber
        };

        db.create(validData, (err, user) => {
          if (err) {
            handleError(500, err.message, res);
          }

          res.end(JSON.stringify(user));
        });
      } catch (err) {
        handleError(400, err.message, res);
      }
    });
  } else {
    handleError(404, 'Not Found', res);
  }
};

const handlePUTRequest = (req, res) => {
  if (req.url.search(/\/api\/users\/[a-zA-Z0-9]{36}$/) !== -1) {
    let data = '';

    req.on('error', err => {
      handleError(400, err, res);
    }).on('data', chunk => {
      data += chunk;
    }).on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        const {
          id,
          firstName,
          lastName,
          company,
          position,
          email,
          phoneNumber
        } = parsedData;
        const validData = {
          id,
          firstName,
          lastName,
          company,
          position,
          email,
          phoneNumber
        };

        db.update(validData, (err, user) => {
          if (err) {
            handleError(500, err.message, res);
          }

          res.end(JSON.stringify(user));
        });
      } catch (err) {
        console.log('here');
        handleError(400, err.message, res);
      }
    });
  } else {
    handleError(404, 'Not Found', res);
  }
};

const handleDELETERequest = (req, res) => {
  if (req.url.search(/\/api\/users\/[a-zA-Z0-9]{36}$/) !== -1) {
    const id = req.url.match(/[a-zA-Z0-9]{36}$/)[0];

    db.remove(id, err => {
      if (err) {
        handleError(500, err, res);
      }

      res.end('OK');
    });
  } else {
    handleError(404, 'Not Found', res);
  }
};

const server = new Server((req, res) => {
  switch (req.method) {
    case 'GET':
      handleGETRequest(req, res);

      break;
    case 'POST':
      handlePOSTRequest(req, res);

      break;
    case 'PUT':
      handlePUTRequest(req, res);

      break;
    case 'DELETE':
      handleDELETERequest(req, res);

      break;
    default:
      res.writeHead(404, 'Not found');
      res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});