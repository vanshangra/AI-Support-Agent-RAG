  const mongoose  = require('mongoose');
  const embeddingSchema = new mongoose.Schema({
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document'
    },
    chunkText: String,
    vectorId: String,
  });

  module.exports = mongoose.model("Embedding", embeddingSchema);