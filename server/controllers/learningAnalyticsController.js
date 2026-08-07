const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Bookmark = require("../models/Bookmark");
const Certificate = require("../models/Certificate");
const Roadmap = require("../models/Roadmap");
const StudyPlan = require("../models/StudyPlan");
const KnowledgeNote = require("../models/KnowledgeNote");

const getLearningAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const [
      user,
      totalCourses,
      completedCourses,
      inProgressCourses,
      savedCourses,
      certificatesEarned,
      totalRoadmaps,
      totalKnowledgeResources,
      totalStudyTasks,
      completedStudyTasks,
    ] = await Promise.all([
      User.findById(userId).select(
        "name email role xp level streak badges achievements"
      ),

      Course.countDocuments(),

      CourseProgress.countDocuments({
        user: userId,
        completed: true,
      }),

      CourseProgress.countDocuments({
        user: userId,
        completed: false,
        progress: { $gt: 0 },
      }),

      Bookmark.countDocuments({
        user: userId,
      }),

      Certificate.countDocuments({
        user: userId,
      }),

      Roadmap.countDocuments(),

      KnowledgeNote.countDocuments({
        published: true,
      }),

      StudyPlan.countDocuments({
        user: userId,
      }),

      StudyPlan.countDocuments({
        user: userId,
        completed: true,
      }),
    ]);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const pendingStudyTasks = Math.max(
      0,
      totalStudyTasks - completedStudyTasks
    );

    const courseCompletionRate =
      totalCourses === 0
        ? 0
        : Math.round((completedCourses / totalCourses) * 100);

    const studyTaskCompletionRate =
      totalStudyTasks === 0
        ? 0
        : Math.round((completedStudyTasks / totalStudyTasks) * 100);

    const progressRecords = await CourseProgress.find({
      user: userId,
    })
      .populate("course", "title category level thumbnail")
      .sort({ updatedAt: -1 })
      .limit(5);

    const recentCertificates = await Certificate.find({
      user: userId,
    })
      .populate("course", "title category thumbnail")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentActivity = [];

    progressRecords.forEach((record) => {
      if (!record.course) return;

      recentActivity.push({
        type: record.completed
          ? "course_completed"
          : "course_progress",
        title: record.completed
          ? `Completed ${record.course.title}`
          : `Continued ${record.course.title}`,
        description: record.completed
          ? "Course completed successfully"
          : `${record.progress || 0}% progress`,
        date: record.updatedAt,
        courseId: record.course._id,
      });
    });

    recentCertificates.forEach((certificate) => {
      if (!certificate.course) return;

      recentActivity.push({
        type: "certificate_earned",
        title: `Earned ${certificate.course.title} certificate`,
        description: "Certificate unlocked",
        date: certificate.createdAt,
        courseId: certificate.course._id,
      });
    });

    recentActivity.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.status(200).json({
      success: true,

      analytics: {
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          xp: user.xp || 0,
          level: user.level || 1,
          streak: user.streak || 0,
          badges: user.badges || [],
          achievements: user.achievements || [],
        },

        courses: {
          total: totalCourses,
          completed: completedCourses,
          inProgress: inProgressCourses,
          completionRate: courseCompletionRate,
        },

        bookmarks: {
          total: savedCourses,
        },

        certificates: {
          total: certificatesEarned,
        },

        roadmaps: {
          totalAvailable: totalRoadmaps,
        },

        knowledge: {
          totalAvailable: totalKnowledgeResources,
        },

        studyPlanner: {
          totalTasks: totalStudyTasks,
          completedTasks: completedStudyTasks,
          pendingTasks: pendingStudyTasks,
          completionRate: studyTaskCompletionRate,
        },

        recentActivity: recentActivity.slice(0, 8),
      },
    });
  } catch (error) {
    console.error("Learning analytics error:", error);

    res.status(500).json({
      success: false,
      message:
        error.message || "Failed to load learning analytics",
    });
  }
};

module.exports = {
  getLearningAnalytics,
};