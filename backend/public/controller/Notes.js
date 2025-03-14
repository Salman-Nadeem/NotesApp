const Note = require('../model/Notes');

// 🟢 Create Note
const createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title aur Content zaroori hai" });
  }

  try {
    const newNote = new Note({
      title,
      content // Token se userId milega
    });

    await newNote.save();
    res.status(201).json({ message: "Note created successfully", note: newNote });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getNotes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const notes = await Note.find({ user: req.user.userId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({ notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔵 Update Note
const updateNote = async (req, res) => {
  const { title, content } = req.body;
  const noteId = req.params.id;

  try {
    const note = await Note.findOne({ _id: noteId});

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    await note.save();

    res.status(200).json({ message: "Note updated", note });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔴 Delete Note
const deleteNote = async (req, res) => {
  const noteId = req.params.id;

  try {
    const note = await Note.findOneAndDelete({ _id: noteId, user: req.user.userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createNote, getNotes, updateNote, deleteNote };
