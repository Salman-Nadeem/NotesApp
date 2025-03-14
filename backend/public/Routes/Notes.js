const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/auth");
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controller/Notes");

// ✅ Get all notes & Create a new note (Protected Routes)
router
  .route("/")
  .get(authMiddleware, getNotes) // Get Notes (Protected)
  .post(authMiddleware, createNote); // Create Note (Protected)

// ✅ Update & Delete a note by ID (Protected Routes)
router
  .route("/:id")
  .put(authMiddleware, updateNote) // Update Note (Protected)
  .delete(authMiddleware, deleteNote); // Delete Note (Protected)

module.exports = router;
