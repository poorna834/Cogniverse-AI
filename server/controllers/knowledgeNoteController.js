const KnowledgeNote = require("../models/KnowledgeNote");

// Create Knowledge Note
const createKnowledgeNote = async (req, res) => {
  try {
    const note = await KnowledgeNote.create(req.body);

    res.status(201).json({
      success: true,
      message: "Knowledge note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Knowledge Notes
const getKnowledgeNotes = async (req, res) => {
  try {
    const { search, category, subject, level, featured } = req.query;

    const query = { published: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { chapter: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    if (category) query.category = category;
    if (subject) query.subject = subject;
    if (level) query.level = level;
    if (featured) query.featured = featured === "true";

    const notes = await KnowledgeNote.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalNotes: notes.length,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Knowledge Note
const getKnowledgeNote = async (req, res) => {
  try {
    const note = await KnowledgeNote.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Knowledge note not found",
      });
    }

    note.views += 1;
    await note.save();

    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Knowledge Note
const updateKnowledgeNote = async (req, res) => {
  try {
    const note = await KnowledgeNote.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Knowledge note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Knowledge note updated successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Knowledge Note
const deleteKnowledgeNote = async (req, res) => {
  try {
    const note = await KnowledgeNote.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Knowledge note not found",
      });
    }

    await KnowledgeNote.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Knowledge note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Increment Download Count
const incrementDownload = async (req, res) => {
  try {
    const note = await KnowledgeNote.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Knowledge note not found",
      });
    }

    note.downloads += 1;
    await note.save();

    res.status(200).json({
      success: true,
      downloads: note.downloads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createKnowledgeNote,
  getKnowledgeNotes,
  getKnowledgeNote,
  updateKnowledgeNote,
  deleteKnowledgeNote,
  incrementDownload,
};