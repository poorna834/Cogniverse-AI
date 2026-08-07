const User = require("../models/User");

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find({ role: "student" })
      .select("name email xp level badges achievements profileImage streak")
      .sort({ xp: -1 });

    res.status(200).json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getLeaderboard,
};