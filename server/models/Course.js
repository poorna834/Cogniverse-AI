const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
      default: "",
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    duration: {
      type: String,
      default: "",
    },

    instructor: {
      type: String,
      default: "",
    },

    platform: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: "English",
    },

    thumbnail: {
      type: String,
      default: "",
    },

    courseLink: {
      type: String,
      required: true,
    },

    documentation: {
      type: String,
      default: "",
    },

    githubRepo: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
      },
    ],

    skills: [
      {
        type: String,
      },
    ],

    prerequisites: [
      {
        type: String,
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 5,
    },

    totalStudents: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);