const express = require("express");
const router = express.Router();

const {
  getAllDocuments,
  deleteDocument
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

router.get("/documents", protect, getAllDocuments);
router.delete("/documents/:id", protect, deleteDocument);

module.exports = router;