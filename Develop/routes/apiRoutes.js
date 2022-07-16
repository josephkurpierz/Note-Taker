const router = require("express").Router();
const dbJson = require("../db/db.json");
const fs = require("fs");
const path =- require("path");

router.get("/notes", (req, res) => {
  console.log("get api notes")
  let results = fs.readFileSync(path.join(__dirname,"./db/db.json"));
  let parseResults = JSON.parse(results);
  if (parseResults) {
    res.json(parseResults);
  } else {
    res.send(404);
  }
});

router.post("/notes", (req, res) => {
  console.log("post api note");
  const note = saveNote(req.body);
  res.json(note);
});

module.exports = router;
