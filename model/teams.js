const mongoose = require("mongoose");

const teamsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    name: {
        type: String,
        required: true,
    },
    captain_id: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    logo: {
        type: String,
        required: false,
    },
    tournament_id: {
        type: Number,
        required: true,
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

module.exports = mongoose.model("teams", teamsSchema);