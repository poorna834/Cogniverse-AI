const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { calculateLevel } = require("../utils/gamification");
const { addXP } = require("../utils/xpManager");
const updateLoginStreak = require("../utils/streakManager");

// ================= Generate JWT =================
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

// ================= REGISTER =================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      xp: 0,
      level: 1,
      streak: 0,
      badges: [],
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        badges: user.badges,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= LOGIN =================
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // ================= XP SYSTEM =================
    user.xp += 5;

    user.level = calculateLevel(user.xp);
    updateLoginStreak(user);

    if (!user.badges.includes("⭐ First Login")) {
      user.badges.push("⭐ First Login");
    }

    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

        profileImage: user.profileImage,

        bio: user.bio,
        goal: user.goal,
        favoriteSubject: user.favoriteSubject,
        interests: user.interests,

        xp: user.xp,
        level: user.level,
        streak: user.streak,
        badges: user.badges,

        achievements: user.achievements,
        streak: user.streak,
        profileImage: user.profileImage,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET PROFILE =================
const getProfile = async (req, res) => {
  res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user,
  });
};

// ================= UPLOAD PROFILE IMAGE =================
const uploadProfileImage = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.profileImage = req.file.path;

    await user.save();

    res.status(200).json({
      message: "Profile image uploaded successfully",

      profileImage: user.profileImage,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

        profileImage: user.profileImage,

        xp: user.xp,
        level: user.level,
        streak: user.streak,
        badges: user.badges,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= DELETE PROFILE IMAGE =================
const deleteProfileImage = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.profileImage = "";

    await user.save();

    res.status(200).json({
      message: "Profile image deleted successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

        profileImage: "",

        xp: user.xp,
        level: user.level,
        streak: user.streak,
        badges: user.badges,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE PROFILE =================
const updateProfile = async (req, res) => {
  try {

    const {
      name,
      bio,
      goal,
      favoriteSubject,
      interests,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.goal = goal || user.goal;
    user.favoriteSubject = favoriteSubject || user.favoriteSubject;
    user.interests = interests || user.interests;

    await addXP(user, "PROFILE_UPDATE");

    res.status(200).json({
      message: "Profile updated successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

        profileImage: user.profileImage,

        bio: user.bio,
        goal: user.goal,
        favoriteSubject: user.favoriteSubject,
        interests: user.interests,

        xp: user.xp,
        level: user.level,
        streak: user.streak,
        badges: user.badges,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  uploadProfileImage,
  deleteProfileImage,
  updateProfile,
};