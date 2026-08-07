const AIChat = require("../models/AIChat");
const { generateAIResponse } = require("../services/aiService");

// Chat with Pixi
const chatWithAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const aiReply = await generateAIResponse(question);

    const chat = await AIChat.create({
      user: req.user._id,
      question,
      answer: aiReply.answer,
      category: aiReply.category,
    });

    res.status(200).json({
      success: true,
      reply: chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get chat history
const getChatHistory = async (req, res) => {
  try {
    const chats = await AIChat.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Clear chat history
const clearChatHistory = async (req, res) => {
  try {
    await AIChat.deleteMany({
      user: req.user._id,
    });

    res.json({
      success: true,
      message: "Chat history cleared.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  chatWithAI,
  getChatHistory,
  clearChatHistory,
};