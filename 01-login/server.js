const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.get("/api/private", (req, res) => {
  res.send({
    msg: "Your ID token was successfully validated!"
  });
});

app.get("/api/admin", (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!"
  });
});

module.exports = app;
