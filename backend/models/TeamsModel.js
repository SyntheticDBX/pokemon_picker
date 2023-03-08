const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    team: [
        {
            name: { type: String },
            types: [{ type: String }],
            sprite: { type: String },
            _id: false,
        },
    ],
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Team', TeamSchema);