const User = require("../models/User");
const Course = require("../models/Course");
const Certificate = require("../models/Certificate");
const Bookmark = require("../models/Bookmark");

const getAdminAnalytics = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalCourses = await Course.countDocuments();
    const totalCertificates = await Certificate.countDocuments();
    const totalBookmarks = await Bookmark.countDocuments();

    const topLearners = await User.find({ role: "student" })
      .select("name email xp level streak")
      .sort({ xp: -1 })
      .limit(5);

    const recentStudents = await User.find({ role: "student" })
      .select("name email createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    const featuredCourses = await Course.countDocuments({ featured: true });

    const xpStats = await User.aggregate([
      { $match: { role: "student" } },
      {
        $group: {
          _id: null,
          totalXP: { $sum: "$xp" },
          averageXP: { $avg: "$xp" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        totalStudents,
        totalAdmins,
        totalCourses,
        totalCertificates,
        totalBookmarks,
        featuredCourses,
        totalXP: xpStats[0]?.totalXP || 0,
        averageXP: Math.round(xpStats[0]?.averageXP || 0),
        topLearners,
        recentStudents,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAdminAnalytics,
};