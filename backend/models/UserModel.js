const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

// creating user signup schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
})

// static method signup
userSchema.statics.signup = async function(username, password, email, starter) {

    // validate username, password and email
    if(!username || !password || !email || !starter) {
        throw Error('Please fill in all the fields');
    }
    if (!validator.isEmail(email)) {
        throw Error('Please enter a valid email address');
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter');
    }
    if(!validator.isAlphanumeric(username) ) {
        throw Error('Username must be at least 3 characters long and contain only letters and numbers');
    }
    if(!starter) {
        throw Error('Please select a starter pokemon');
    }

    // check if username or email already exists
    const exists = await this.findOne({ username, email });
    if (exists) {
        throw Error('Username or email already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create new user
    const user = new this({
        username,
        password: hash,
        email,
        starter
    });

    // save user to database
    return user.save();
}

// static method login
userSchema.statics.login = async function(username, password) {
    
    // validate username and password
    if(!username || !password) {
        throw Error('Please fill in  all the fields');
    }
    
    // check if username exists
    const user = await this.findOne({ username });
    if (!user) {
        throw Error('Username or password is incorrect');
    }

    // check if password is correct
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Username or password is incorrect');
    }

    // create and return token
    return user;
}


module.exports = mongoose.model('User', userSchema);