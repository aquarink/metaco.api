const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    title: {
        type: String,
        required: true,
    },
    start_date: {
        type: String,
        required: false,
    },
    end_date: {
        type: String,
        required: false,
    },
    team_count: {
        type: Number,
        required: false,
    },
    slot: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
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

module.exports = mongoose.model("tournament", TournamentSchema);