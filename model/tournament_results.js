const mongoose = require("mongoose");

// API
const Teams = require("./teams.js");
const Tournament = require("./tournament.js");

const tournamentResultSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    team_data: {
        type: Array,
        default: []
    },
    position: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    point: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    tournament_data: {
        type: Array,
        default: []
    },
    created_at: {
        type: String,
        required: true,
    },
    updated_at: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("tournament_result", tournamentResultSchema);