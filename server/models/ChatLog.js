const mongoose = require('mongoose');

const chatLogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    question: String,
    answer: String,
    sources: [{
        document_id: String,
        chunk_index: Number
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ChatLog", chatLogSchema);
