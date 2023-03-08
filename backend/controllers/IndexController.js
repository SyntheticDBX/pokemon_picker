const path = require('path');
const User = require('./UserController');
const Teams = require('./TeamsController');

const getReactPage = (req, res) => res.sendFile(path.join(`${__dirname}/../../frontend/build/index.html`));

module.exports = {
  getReactPage,
  User,
  Teams,
};