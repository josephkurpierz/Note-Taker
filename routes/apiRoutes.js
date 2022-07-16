const router = require("express").Router();
const dbJson = require("../db/db.json");
const fs = require("fs");
const path = require("path");
const {createNote, getNotes} = require("../db/db");

router.get("/notes", (req, res) => {
  getNotes()
    .then((notes)=> {
      return res.json(notes);
    })
    .catch((err)=>
      res.status(500).json(err)
    )
});

router.post("/notes", (req, res) => {
  console.log("post api note");
  const note = createNote(req.body);
  res.json(note);
});

// router.delete("/notes/:id", (req,res) => {
//   console.log("req params", req.params.id);
//   dbJson = dbJson.filter(({ id }) => id !== req.params.id);
// })

module.exports = router;
