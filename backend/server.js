require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

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