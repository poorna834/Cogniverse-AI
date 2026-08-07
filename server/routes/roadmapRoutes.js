const express = require("express");
const router = express.Router();

const {
  createRoadmap,
  getRoadmaps,
  getRoadmapById,
  updateRoadmap,
  deleteRoadmap,
} = require("../controllers/roadmapController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getRoadmaps);
router.get("/:id", protect, getRoadmapById);

router.post("/", protect, createRoadmap);
router.put("/:id", protect, updateRoadmap);
router.delete("/:id", protect, deleteRoadmap);

module.exports = router;