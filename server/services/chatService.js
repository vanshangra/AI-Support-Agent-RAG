const axios = require("axios");

const queryRAG = async (question) => {

  try {

    const response = await axios.post(
      "http://localhost:8000/query",
      { question }
    );

    return response.data;

  } catch (error) {

    throw new Error("RAG query failed");

  }

};

module.exports = { queryRAG };