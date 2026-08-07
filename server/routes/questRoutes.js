const express = require("express");
const router = express.Router();

const {
  getTodayQuests,
  completeQuest,
} = require("../controllers/questController");

const { protect } = require("../middleware/authMiddleware");

router.get("/today", protect, getTodayQuests);
router.put("/complete/:questId", protect, completeQuest);

module.exports = router;