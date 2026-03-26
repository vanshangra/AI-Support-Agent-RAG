const mongoose = require('mongoose');

const refreshTokenScheme = new mongoose.Schema({
    userId: String,
    token: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("RefreshToken", refreshTokenScheme);