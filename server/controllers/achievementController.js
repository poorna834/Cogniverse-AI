const User = require("../models/User");

const getAchievements = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({
      success: true,
      achievements: user.achievements,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAchievements,
};