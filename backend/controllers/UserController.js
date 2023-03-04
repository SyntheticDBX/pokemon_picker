const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.TOKEN_SECRET, {
        expiresIn: 60 * 60 * 24 * 365
    });

    // user login
    const loginUser = async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.login(username, password);
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 365 * 1000 });
            res.status(200).json({ user: user._id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // user signup
    const signupUser = async (req, res) => {
        try {
            const { username, password, email } = req.body;
            const user = await User.signup(username, password, email);
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 365 * 1000 });
            res.status(201).json({ user: user._id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // user logout
    const logoutUser = (req, res) => {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/');
    }
}

module.exports = {
    loginUser,
    signupUser,
    logoutUser
}