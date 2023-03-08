const crypto = require('crypto');

// create a secure password
const createPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const createHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt,
    hash: createHash,
  };
};

// verify a password
const validPassword = (password, hash, salt) => {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
};

module.exports = {
  createPassword,
  validPassword,
};