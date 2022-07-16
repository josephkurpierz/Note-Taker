const router = require("express").Router();
const dbJson = require("../db/db.json");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');//use uuidv4() to create random id


function createNote(info,dbJson){
  const note = info;
  console.log("  info =", info, "  dbJson =", dbJson);
  dbJson.push(note);
  fs.writeFileSync(path.join(__dirname,"../db/db.json"),JSON.stringify    ({dbJson},null, 2));
  return info;
};

router.get("/notes", (req, res) => {
  console.log("get api notes")
  let results = dbJson;
  if (results) {
    res.json(results);
  } else {
    res.send(404);
  }
});

router.post("/notes", (req, res) => {
  console.log("post api note");
  req.body.id = uuidv4();
  const note = createNote(req.body,dbJson);
  res.json(note);
});

router.delete("/notes/:id", (req,res) => {
  console.log("req params", req.params.id);
  dbJson = dbJson.filter(({ id }) => id !== req.params.id);
})

module.exports = router;
