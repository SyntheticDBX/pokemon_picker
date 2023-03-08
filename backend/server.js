require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const router = require('./router');
const MongoStore = require('connect-mongo');

// express app
const app = express();

// connection to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listening for requests
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch(error => console.log(error));

// static files
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use (
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
    })
);

// passport
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', router);

