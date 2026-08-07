const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  getRoadmapProgress,
} = require("../controllers/roadmapProgressController");

router.get("/:roadmapId", protect, getRoadmapProgress);

module.exports = router;