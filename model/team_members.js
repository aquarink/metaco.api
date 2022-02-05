const mongoose = require("mongoose");

const teamMembersSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    user_id: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    team_id: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    roles: {
        type: String,
        required: true,
    },
    ingame_id: {
        type: String,
        required: true,
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

module.exports = mongoose.model("team_members", teamMembersSchema);