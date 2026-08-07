const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
  try {

    const notifications = await Notification.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      notifications,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const markAsRead = async (req, res) => {

  try {

    const notification =
      await Notification.findById(req.params.id);

    notification.read = true;

    await notification.save();

    res.json({
      success: true,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getNotifications,
  markAsRead,
};