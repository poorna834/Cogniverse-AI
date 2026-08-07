const Bookmark = require("../models/Bookmark");
const User = require("../models/User");
const { addXP } = require("../utils/xpManager");

// ================= ADD BOOKMARK =================
const addBookmark = async (req, res) => {
  try {
    const exists = await Bookmark.findOne({
      user: req.user._id,
      course: req.params.courseId,
    });

    if (exists) {
      return res.status(400).json({
        message: "Course already bookmarked",
      });
    }

    const bookmark = await Bookmark.create({
      user: req.user._id,
      course: req.params.courseId,
    });

    // Give XP for bookmarking
    const user = await User.findById(req.user._id);

    if (user) {
      await addXP(user, "BOOKMARK");
    }

    res.status(201).json({
      success: true,
      message: "Course bookmarked successfully",
      bookmark,
      xpEarned: 10,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET BOOKMARKS =================
const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      user: req.user._id,
    }).populate("course");

    res.status(200).json({
      success: true,
      bookmarks,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= REMOVE BOOKMARK =================
const removeBookmark = async (req, res) => {
  try {
    await Bookmark.findOneAndDelete({
      user: req.user._id,
      course: req.params.courseId,
    });

    res.status(200).json({
      success: true,
      message: "Bookmark removed",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addBookmark,
  getBookmarks,
  removeBookmark,
};