const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

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
