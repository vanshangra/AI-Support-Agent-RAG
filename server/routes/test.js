const express = require('express');
const router = express.Router();
const Document = require("../models/document");

router.get("/create", async (req, res) => {
    const doc = new Document({
        title: "Test Document",
        fileUrl: "test.pdf",
   });

   await doc.save();
    res.json(doc);
});

module.exports = router;