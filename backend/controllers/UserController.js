const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 * 365,
  });
};
  // user login
const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.login(username, password);
		const token = createToken(user._id);
		res.cookie("jwt", token, {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 365 * 1000,
		});
		res.status(200).json({ username, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

  // user signup
const signupUser = async (req, res) => {
	try {
		const { username, password, email, starter } = req.body;
		const user = await User.signup(username, password, email, starter);
		const token = createToken(user._id);
		res.cookie("jwt", token, {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 365 * 1000,
		});
		res.status(201).json({ email, user: _id, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

  // user logout
const logoutUser = (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.redirect("/");
};

// user profile
const findUserById = async (req, res) => {
	try {
		const user = await User.findById({ _id: req.params.id});
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

module.exports = {
  loginUser,
  signupUser,
  logoutUser,
  findUserById,
};
