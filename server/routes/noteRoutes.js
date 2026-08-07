const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createNote,
  getMyNotes,
  getNoteById,
  updateNote,
  deleteNote,
  togglePinNote,
} = require("../controllers/noteController");

router.post("/", protect, createNote);
router.get("/", protect, getMyNotes);
router.get("/:id", protect, getNoteById);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);
router.patch("/pin/:id", protect, togglePinNote);

module.exports = router;