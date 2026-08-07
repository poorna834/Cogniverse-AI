const mongoose = require("mongoose");

const careerRoadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    career: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    studyHours: {
      type: Number,
      default: 2,
    },

    roadmap: [
      {
        month: Number,
        title: String,
        topics: [String],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CareerRoadmap", careerRoadmapSchema);