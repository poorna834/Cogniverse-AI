const Certificate = require("../models/Certificate");

// Get all certificates of logged-in user
const getMyCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({
      user: req.user._id,
    })
      .populate("course")
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      certificates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// NEW: Get certificate by MongoDB _id
const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate("course")
      .populate("user", "name email");

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      success: true,
      certificate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify certificate using certificateId
const verifyCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      certificateId: req.params.id,
    })
      .populate("user", "name email")
      .populate("course", "title description");

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      success: true,
      certificate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getMyCertificates,
  getCertificateById,
  verifyCertificate,
};