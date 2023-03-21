const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE.1 : Get all the notes using: GET: "/api/notes/fetchallnotes" login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Error Ocuured !");
  }
});

// ROUTE.2 : Add a new note using POST: "/api/notes/addnote" login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title...").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters...").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors, return Bad requests and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNotes = await note.save();

      res.json(savedNotes);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Ocuured !");
    }
  }
);

module.exports = router;
