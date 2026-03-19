const mongoose = require("mongoose");

const sessionScheme = new mongoose.SchemaType({
    userId: String,
    userAgent: String,
    ipAddress: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Session", sessionScheme);