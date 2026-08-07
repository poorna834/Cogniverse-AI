const express = require("express");
const router = express.Router();

const {
  getLearningAnalytics,
} = require("../controllers/learningAnalyticsController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.get("/", protect, getLearningAnalytics);

module.exports = router;