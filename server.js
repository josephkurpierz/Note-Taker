const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require("./db/db.json");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const { v4: uuidv4 } = require('uuid');//use uuidv4() to create random id

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

//listener
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
