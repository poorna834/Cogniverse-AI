const express = require("express");
const router = express.Router();

const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

router.post("/", protect, adminOnly, createCourse);
router.get("/", getCourses);
router.get("/:id", getCourse);
router.delete("/:id", protect, adminOnly, deleteCourse);
router.put("/:id", protect, adminOnly, updateCourse);

module.exports = router;