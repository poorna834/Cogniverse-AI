const express = require("express");
const router = express.Router();

const {
  chatWithAI,
  getChatHistory,
  clearChatHistory,
} = require("../controllers/aiController");

const { protect } = require("../middleware/authMiddleware");

router.post("/chat", protect, chatWithAI);

router.get("/history", protect, getChatHistory);

router.delete("/history", protect, clearChatHistory);

module.exports = router;