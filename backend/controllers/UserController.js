const User = require('../models/UserModel');
const Team = require('../models/TeamsModel');
const { createPassword } = require('../lib/passportUtilities');

// register a new user
const registerUser = (req, res) => {
  const { username, password, password2 } = req.body;

  if (password !== password2) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  const saltHash = createPassword(password);

  const { salt, hash } = saltHash;

  const newUser = new User({
    username,
    hash,
    salt,
  });

  return newUser
    .save()
    .then((user) => {
      console.log(user);
      return res.status(200).json({ message: 'Registration successful!' });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(400).json({ message: 'That user already exists.' });
      }
      return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    });
};

// login a user
const loginUser = (req, res) => res.status(200).json({ message: 'Login successful!' });

// logout a user
const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred while logging out' });
    }
    return res.status(200).json({ message: 'Logout successful!' });
  });
};


// get the username of the user
const getUsername = (req, res) => {
  const username = req?.user?.username;
  if (username) {
    return res.status(200).json({ username });
  }
  return res.status(200).json({ username: '' });
};

// get all users
const getUser = async (req, res) => {
  const users = await User.find({}, { username: 1 }).lean();
  res.status(200).json(users);
};

// delete a user and their teams
const deleteUser = async (req, res) => {
  const { username } = req.params;
  console.log(`Deleting ${username} and their teams`);

  // check if the user is trying to delete themselves
  if (username === req.user.username) {
    return res.status(400).json({ message: 'You cannot delete yourself.' });
  }
  try {
    const teamPromise = Team.deleteMany({ username });
    const userPromise = User.deleteOne({ username });
    const queries = await Promise.all([teamPromise, userPromise]);
    const [teamQuery] = queries;
    return res
      .status(200)
      .json({ message: `Deleted ${username} and deleted ${teamQuery.deletedCount} teams.` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'An error occurred.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUsername,
  getUser,
  deleteUser,
};
