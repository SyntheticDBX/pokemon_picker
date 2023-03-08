require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const router = require('./router');

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

// session
const sessionStore = new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions'
});
app.use (
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
    })
);

// passport
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

// router
router(app);