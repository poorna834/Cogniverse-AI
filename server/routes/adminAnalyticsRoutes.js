const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  getAdminAnalytics,
} = require("../controllers/adminAnalyticsController");

router.get("/", protect, getAdminAnalytics);

module.exports = router;