const ChatLog = require("../models/ChatLog");

const getUserChats = async (req, res, next) => {
  try {
    const chats = await ChatLog.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(chats);
  } catch (error) {
    next(error);
  }

};

module.exports = { getUserChats };