require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getData } = require("./src/controllers/data");
const app = express();
const port = process.env.PORT || 9000;

app.use(cors())
// API endpoint to fetch and process data
app.get("/api/data", getData);

const startServer = async () => {
  try {
    app.listen(port, () => console.log("listening on port " + port));
  } catch (error) {
    console.log(error);
  }
};

startServer();
