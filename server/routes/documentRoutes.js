const express = require("express");
const axios = require("axios");
const router = express.Router();
const upload = require("../middleware/upload");
const {v4:uuidv4} = require("uuid");

const Document = require("../models/document");
const {sendDocumentForProcessing} = require("../services/ragService");

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // 1. Check file received
    console.log("File:", req.file);

    // 2. Fix Windows path
    const path = require("path");
    const filePath = path.resolve(req.file.path).replace(/\\/g, "/");

    // 3. Create unique ID
    const documentId = Date.now().toString();

    // 4. SAVE TO MONGODB FIRST ✅
    const doc = new Document({
      documentId: documentId,
      title: req.file.originalname,
      filePath: filePath,
      status: "processing"
    });

    await doc.save();
    console.log("Saved to MongoDB");

    // 5. CALL PYTHON AFTER SAVE ✅
    await axios.post("http://localhost:8000/process", {
      filePath: filePath,
      documentId: documentId
    });

    // 6. Send response
    res.json({
      message: "Upload successful",
      documentId: documentId
    });

  } catch (error) {
    console.error("ERROR:", error.message);

    res.status(500).json({
      error: error.message
    });
  }
});
module.exports = router;