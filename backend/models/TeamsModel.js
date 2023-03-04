const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// creating team schema
const teamSchema = new Schema({

    teamName: {
        type: String,
        required: true,
        unique: true
    },
    pokemon: {
        type: String,
        required: true
    },
    moves: {
        type: String,
        required: true
    },
    evs: {
        type: String,
        required: true
    },
    ivs: {
        type: String,
        required: true
    },
    nature: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    ability: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Team', teamSchema);

