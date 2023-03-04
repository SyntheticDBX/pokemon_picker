require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const UserRoutes = require('./routes/UserRoutes');
const TeamsRoutes = require('./routes/TeamsRoutes');

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


// routes
app.use('/api/users', UserRoutes);
app.use('/api/teams', TeamsRoutes);

// connection to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listening for requests
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch(error => console.log(error));