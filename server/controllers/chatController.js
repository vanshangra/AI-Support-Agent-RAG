const { queryRAG } = require("../services/chatService");
const Chatlog = require("../models/ChatLog");
const {log} = require("../services/loggerService")

const askQuestion = async (req, res, next) => {

  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "Question is required"
      });
    }

    const result = await queryRAG(question);

    // Save chat history
    await Chatlog.create({
      userId: req.user?.id || "anonymous",
      question,
      answer: result.answer,
      sources: result.sources
    });

    log(`User asked: ${question}`);
    
    res.json(result);

  } catch (error) {
    log(`Error: ${error.message}`);
    next(error);
  }

};

module.exports = { askQuestion };