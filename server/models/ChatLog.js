const mongoose = require('mongoose');

const chatLogSchema = new mongoose.Schema({
    userId: String,
    question: String,
    answer: String,
    sources: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ChatLog", chatLogSchema);
