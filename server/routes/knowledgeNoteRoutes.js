const express = require("express");
const router = express.Router();

const {
  createKnowledgeNote,
  getKnowledgeNotes,
  getKnowledgeNote,
  updateKnowledgeNote,
  deleteKnowledgeNote,
  incrementDownload,
} = require("../controllers/knowledgeNoteController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createKnowledgeNote);
router.get("/", protect, getKnowledgeNotes);
router.get("/:id", protect, getKnowledgeNote);
router.put("/:id", protect, updateKnowledgeNote);
router.delete("/:id", protect, deleteKnowledgeNote);
router.patch("/download/:id", protect, incrementDownload);

module.exports = router;