const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const {notes} = require('./Develop/db/db.json');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));