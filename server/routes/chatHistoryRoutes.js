const express = require("express");
const router = express.Router();

const {getUserChats} = require("../controllers/chatHistoryController");
const {protect} = require("../middleware/authMiddleware");

router.get("/", protect, getUserChats);

module.exports = router;