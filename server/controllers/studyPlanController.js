const StudyPlan = require("../models/StudyPlan");

const createTask = async (req, res) => {
  try {
    const task = await StudyPlan.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Study task created",
      task,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyTasks = async (req, res) => {
  try {
    const { date } = req.query;

    const query = { user: req.user._id };

    if (date) {
      query.date = date;
    }

    const tasks = await StudyPlan.find(query).sort({
      date: 1,
      startTime: 1,
    });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await StudyPlan.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated",
      task,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await StudyPlan.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const toggleTask = async (req, res) => {
  try {
    const task = await StudyPlan.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task status updated",
      task,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
  toggleTask,
};