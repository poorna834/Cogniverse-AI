const Roadmap = require("../models/Roadmap");
const CourseProgress = require("../models/CourseProgress");

const getRoadmapProgress = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const roadmap = await Roadmap.findById(roadmapId).populate(
      "milestones.courses",
      "title category level duration thumbnail"
    );

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    const completedProgress = await CourseProgress.find({
      user: req.user._id,
      completed: true,
    });

    const completedCourseIds = completedProgress.map((item) =>
      item.course.toString()
    );

    let totalCourses = 0;
    let completedCourses = 0;
    let firstUnlockedFound = false;

    const milestones = roadmap.milestones.map((milestone, index) => {
      const courses = milestone.courses || [];

      const completedInMilestone = courses.filter((course) =>
        completedCourseIds.includes(course._id.toString())
      ).length;

      totalCourses += courses.length;
      completedCourses += completedInMilestone;

      const isCompleted =
        courses.length > 0 && completedInMilestone === courses.length;

      let status = "locked";

      if (index === 0) {
        status = isCompleted ? "completed" : "unlocked";
      } else if (isCompleted) {
        status = "completed";
      } else if (!firstUnlockedFound) {
        const previousMilestone = roadmap.milestones[index - 1];
        const previousCourses = previousMilestone.courses || [];

        const previousCompletedCount = previousCourses.filter((course) =>
          completedCourseIds.includes(course._id.toString())
        ).length;

        const previousCompleted =
          previousCourses.length > 0 &&
          previousCompletedCount === previousCourses.length;

        if (previousCompleted) {
          status = "unlocked";
          firstUnlockedFound = true;
        }
      }

      return {
        _id: milestone._id,
        title: milestone.title,
        description: milestone.description,
        skills: milestone.skills,
        courses,
        totalCourses: courses.length,
        completedCourses: completedInMilestone,
        completed: isCompleted,
        status,
      };
    });

    const roadmapProgress =
      totalCourses === 0
        ? 0
        : Math.round((completedCourses / totalCourses) * 100);

    res.status(200).json({
      success: true,
      roadmap: {
        _id: roadmap._id,
        title: roadmap.title,
        subtitle: roadmap.subtitle,
        icon: roadmap.icon,
        category: roadmap.category,
        level: roadmap.level,
        duration: roadmap.duration,
        roles: roadmap.roles,
      },
      roadmapProgress,
      totalCourses,
      completedCourses,
      milestones,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRoadmapProgress,
};