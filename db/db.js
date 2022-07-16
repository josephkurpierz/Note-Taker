const router = require("express").Router();
const dbJson = require("./db.json");
const util = require('util');
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');//use uuidv4() to create random id
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

function read() {
  return readFileAsync("db/db.json", "utf8");
}

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
  console.log(getNotes());
  const {title, text} = info;
  const newNote = {title, text, id:uuidv4()};
  console.log(newNote);
  // noteArr.push(note);
  return getNotes()
    .then((notes)=>[...notes,newNote])
    .then((updatedNotes)=>write(updatedNotes))
    .then(() => newNote);
};

module.exports = {
  createNote,
  getNotes
};