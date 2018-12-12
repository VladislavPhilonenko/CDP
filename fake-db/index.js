let db = [{
  id: 'gq57UMCYYgxMOnLkhKcYJK0SY0EyMUnU8h1b',
  firstName: 'James',
  lastName: 'Aren',
  company: 'Epam',
  position: 'Software Engineer',
  email: 'lala@g,ail.com',
  phoneNumber: '0604 449343 343'
}];

function makeId() {
  let id = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 36; i++)
    id += possible.charAt(Math.floor(Math.random() * possible.length));

  return id;
}

module.exports = {
  getCollection(cb) {
    cb(null, db);
  },
  getById(id, cb) {
    let matchedEntries = db.filter(entry => entry.id === id);

    if (matchedEntries.length) {
      cb(null, matchedEntries[0]);
    } else {
      cb(new Error('There is no such record in DB'), null);
    }
  },
  create(model, cb) {
    model.id = makeId();
    db.push(model);

    cb(null, model);
  },
  update(model, cb) {
    let matchedModel = db.filter(entry => entry.id === model.id)[0];

    if (matchedModel) {
      db[db.indexOf(matchedModel)] = model;
      cb(null, model);
    } else {
      cb(new Error('There is no such model'), null)
    }
  },
  remove(id, cb) {
    let matchedModel = db.filter(entry => entry.id === id)[0];

    if (matchedModel) {
      db.splice(db.indexOf(matchedModel), 1);
      cb(null);
    } else {
      cb(new Error('There is no such model'))
    }
  }
};

