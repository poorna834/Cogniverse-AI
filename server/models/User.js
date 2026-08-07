const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    profileImage: {
      type: String,
      default: "",
    },

    bio: {
  type: String,
  default: "",
},

goal: {
  type: String,
  default: "",
},

favoriteSubject: {
  type: String,
  default: "",
},

interests: {
  type: [String],
  default: [],
},

xp: {
  type: Number,
  default: 0,
},

level: {
  type: Number,
  default: 1,
},

badges: [String],

achievements: [
  {
    title: String,
    description: String,
    icon: String,
    earnedAt: {
      type: Date,
      default: Date.now,
    },
  },
],

streak: {
  type: Number,
  default: 0,
},

streak: {
  type: Number,
  default: 0,
},

lastLoginDate: {
  type: Date,
},

wellness: {
  waterBreaks: {
    type: Number,
    default: 0,
  },
  eyeBreaks: {
    type: Number,
    default: 0,
  },
  screenTimeToday: {
    type: Number,
    default: 0,
  },
},
    

  }, {
  timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);