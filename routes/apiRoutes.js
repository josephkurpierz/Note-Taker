const router = require("express").Router();
const dbJson = require("../db/db.json");
const fs = require("fs");
const path = require("path");
const { createNote, getNotes, write } = require("../db/db.js");

router.get("/notes", (req, res) => {
  getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/notes", (req, res) => {
  const note = createNote(req.body);
  res.json(note);
});

router.delete("/notes/:id", (req, res) => {
  let deleteId = req.params.id;
  getNotes()
    .then((notes) => {
      const results = notes.filter((notes) => notes.id !== deleteId);
      write(results);
    });

});

module.exports = router;
