const path = require('path');
const UserModel = require('../models/UserModel');
const TeamsModel = require('../models/TeamsModel');

const getReactPage = (req, res) => res.sendFile(path.join(`${__dirname}/../../frontend/build/index.html`));

module.exports = {
  getReactPage,
  UserModel,
  TeamsModel,
};