const { queryRAG } = require("../services/chatService");

const askQuestion = async (req, res, next) => {

  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "Question is required"
      });
    }

    const result = await queryRAG(question);

    res.json(result);

  } catch (error) {
    next(error);
  }

};

module.exports = { askQuestion };