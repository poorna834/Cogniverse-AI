const Roadmap = require("../models/Roadmap");
const CourseProgress = require("../models/CourseProgress");

const createRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.create(req.body);

    res.status(201).json({
      success: true,
      message: "Roadmap created successfully",
      roadmap,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find()
      .populate("milestones.courses", "title category level")
      .sort({ createdAt: -1 });

    let completedCourseIds = [];

    if (req.user) {
      const progress = await CourseProgress.find({
        user: req.user._id,
        completed: true,
      });

      completedCourseIds = progress.map((p) => p.course.toString());
    }

    const roadmapData = roadmaps.map((roadmap) => {
      let totalCourses = 0;
      let completedCourses = 0;

      const milestones = roadmap.milestones.map((milestone) => {
        const courses = milestone.courses || [];

        const completedInMilestone = courses.filter((course) =>
          completedCourseIds.includes(course._id.toString())
        ).length;

        totalCourses += courses.length;
        completedCourses += completedInMilestone;

        return {
          ...milestone.toObject(),
          totalCourses: courses.length,
          completedCourses: completedInMilestone,
          completed:
            courses.length > 0 && completedInMilestone === courses.length,
        };
      });

      const progress =
        totalCourses === 0
          ? 0
          : Math.round((completedCourses / totalCourses) * 100);

      return {
        ...roadmap.toObject(),
        milestones,
        totalCourses,
        completedCourses,
        progress,
      };
    });

    res.status(200).json({
      success: true,
      roadmaps: roadmapData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id).populate(
      "milestones.courses",
      "title description category level duration thumbnail"
    );

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    res.status(200).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Roadmap updated successfully",
      roadmap,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    await Roadmap.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Roadmap deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createRoadmap,
  getRoadmaps,
  getRoadmapById,
  updateRoadmap,
  deleteRoadmap,
};