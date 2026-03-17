const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    documentId: {
        type: String,
        required: true,
        unique: true
    },
    title: String,
    filePath: String,

    status: {
        type: String,
        enum: ["pending", "processing", "completed", "failed"],
        default: "pending"
    },

    uploadedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },

    chunkCount: Number,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Document", documentSchema);