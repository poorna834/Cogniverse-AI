const express = require("express");
const router = express.Router();

const {
  getMyCertificates,
  getCertificateById,
  verifyCertificate,
} = require("../controllers/certificateController");

const { protect } = require("../middleware/authMiddleware");

// Public Route
router.get("/verify/:id", verifyCertificate);

// Protected Routes
router.get("/", protect, getMyCertificates);
router.get("/:id", protect, getCertificateById);

module.exports = router;