const express = require("express");

const app = express();

app.use("/about", (req, res) => {
  res.send("Hello, I am About Page");
});

app.use("/contact", (req, res) => {
  res.send("Hello, I am Contact Page");
});

app.use("/", (req, res) => {
  res.send("Hello, I am Home Page");
});

app.listen(4500, () => {
  console.log("Server is running on port no. 4500");
});
