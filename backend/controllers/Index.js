const path = require('path');
const User = require('../models/UserModel');
const Teams = require('../models/TeamsModel');

const getReactPage = (req, res) => res.sendFile(path.join(`${__dirname}/../../frontend/build/index.html`));

module.exports = {
  getReactPage,
  User,
  Teams,
};