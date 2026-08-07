const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../config/cloudinary");


const {
  registerUser,
  loginUser,
  getProfile,
  uploadProfileImage,
  deleteProfileImage,
  updateProfile,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put(
  "/profile-image",
  protect,
  upload.single("profileImage"),
  uploadProfileImage
);
router.delete("/profile-image", protect, deleteProfileImage);
router.put("/profile", protect, updateProfile);

module.exports = router;