const mongoose = require('mongoose');

// A model for a user doc
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
