const express = require("express");
const router = express.Router();

const {
  getMyProgress,
  completeCourse,
  updateProgress,
} = require("../controllers/courseProgressController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getMyProgress);
router.put("/complete/:courseId", protect, completeCourse);
router.put("/:courseId", protect, updateProgress);

module.exports = router;