const mongoose = require("mongoose");

const knowledgeNoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      default: "",
    },

    chapter: {
      type: String,
      default: "",
    },

    level: {
      type: String,
      enum: [
        "School",
        "PUC",
        "Diploma",
        "Engineering",
        "Professional",
        "General"
      ],
      default: "Engineering",
    },

    thumbnail: String,

    coverImage: String,

    content: {
      type: String,
      required: true,
    },

    pdf: String,

    video: String,

    github: String,

    tags: [
      {
        type: String,
      },
    ],

    importantQuestions: [
      {
        question: String,
        answer: String,
      },
    ],

    mcqs: [
      {
        question: String,
        options: [String],
        answer: String,
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },

    published: {
      type: Boolean,
      default: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    downloads: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("KnowledgeNote", knowledgeNoteSchema);