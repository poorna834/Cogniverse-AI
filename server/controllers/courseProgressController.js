const CourseProgress = require("../models/CourseProgress");
const User = require("../models/User");
const Certificate = require("../models/Certificate");
const Notification = require("../models/Notification");

const { addXP } = require("../utils/xpManager");
const generateCertificateId = require("../utils/certificateGenerator");

const getMyProgress = async (req, res) => {
  try {
    const progress = await CourseProgress.find({
      user: req.user._id,
    }).populate("course");

    res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const completeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    let progress = await CourseProgress.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (!progress) {
      progress = await CourseProgress.create({
        user: req.user._id,
        course: courseId,
        progress: 100,
        completed: true,
        completedAt: new Date(),
      });
    } else {
      if (progress.completed) {
        return res.status(400).json({
          success: false,
          message: "Course already completed",
        });
      }

      progress.progress = 100;
      progress.completed = true;
      progress.completedAt = new Date();
      await progress.save();
    }

    const user = await User.findById(req.user._id);
    await addXP(user, "COMPLETE_COURSE");

    let certificate = await Certificate.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (!certificate) {
      certificate = await Certificate.create({
        user: req.user._id,
        course: courseId,
        certificateId: generateCertificateId(),
      });
    }

    await Notification.create({
      user: req.user._id,
      title: "Course Completed 🎉",
      message: "Congratulations! Your certificate is ready.",
      icon: "🏆",
    });

    res.status(200).json({
      success: true,
      message: "Course completed successfully!",
      xpEarned: 100,
      progress,
      certificate,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        xp: user.xp,
        level: user.level,
        badges: user.badges,
        achievements: user.achievements,
        streak: user.streak,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { progress } = req.body;

    let record = await CourseProgress.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (!record) {
      record = await CourseProgress.create({
        user: req.user._id,
        course: courseId,
      });
    }

    record.progress = progress;

    if (progress >= 100 && !record.completed) {
      record.completed = true;
      record.completedAt = new Date();
    }

    await record.save();

    res.status(200).json({
      success: true,
      progress: record,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMyProgress,
  completeCourse,
  updateProgress,
};