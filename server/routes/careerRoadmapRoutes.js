const express = require("express");
const router = express.Router();

const {
  generateCareerRoadmap,
  getMyRoadmap,
} = require("../controllers/careerRoadmapController");

const { protect } = require("../middleware/authMiddleware");

router.post("/generate", protect, generateCareerRoadmap);

router.get("/my-roadmap", protect, getMyRoadmap);

module.exports = router;