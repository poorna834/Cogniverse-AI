const CareerRoadmap = require("../models/CareerRoadmap");
const { generateRoadmap } = require("../services/roadmapGenerator");

// Generate a personalized roadmap
const generateCareerRoadmap = async (req, res) => {
  try {
    const { career, level, studyHours } = req.body;

    if (!career) {
      return res.status(400).json({
        success: false,
        message: "Career is required",
      });
    }

    // Remove old roadmap (one roadmap per user)
    await CareerRoadmap.deleteMany({
      user: req.user._id,
    });

    const roadmapData = generateRoadmap(career, level);

    const roadmap = await CareerRoadmap.create({
      user: req.user._id,
      career,
      level,
      studyHours,
      roadmap: roadmapData,
    });

    res.status(201).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user's roadmap
const getMyRoadmap = async (req, res) => {
  try {
    const roadmap = await CareerRoadmap.findOne({
      user: req.user._id,
    });

    res.json({
      success: true,
      roadmap,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateCareerRoadmap,
  getMyRoadmap,
};