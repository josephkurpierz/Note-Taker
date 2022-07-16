const router = require("express").Router();
const dbJson = require("./db.json");
const util = require('util');
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// read json objects from db.json
function read() {
  return readFileAsync("db/db.json", "utf8");
}

//write json object to db.json
function write(note) {
  return writeFileAsync("db/db.json", JSON.stringify(note));
}

function getNotes() {
  return read().then((notes)=>{
    let parseNotes = [].concat(JSON.parse(notes));
    return parseNotes;
  });
}

function createNote(info){
  getNotes();
  const {title, text} = info;
  const newNote = {title, text, id:uuidv4()};
  return getNotes()
    .then((notes)=>[...notes,newNote])
    .then((updatedNotes)=>write(updatedNotes))
    .then(() => newNote);
};

// function deleteNote(id){
//   getNotes()
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       const result = json.filter((id)=>id!==)
//     })


// }

module.exports = {
  createNote,
  getNotes,
  write
};