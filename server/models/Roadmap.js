const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  skills: [
    {
      type: String,
    },
  ],
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const roadmapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "🗺️",
    },
    category: {
      type: String,
      default: "Career",
    },
    level: {
      type: String,
      default: "Beginner",
    },
    duration: {
      type: String,
      default: "Flexible",
    },
    roles: [
      {
        type: String,
      },
    ],
    milestones: [milestoneSchema],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Roadmap", roadmapSchema);