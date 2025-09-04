const express = require("express");

const app = express();

// Middleware is used for authentication, authorization, logging etc. Basically in middleware we write that code which is repeated means it is common for all the routes.
app.use("/user", (req, res, next) => {
  console.log("This is middleware");
  // Maintain the logs.
  console.log(`${Date.now()} ${req.method} ${req.url}`);

  // Authentication & Authorization.
  next(); // This will move to the next middleware/route handler.
});

app.get("/user", (req, res) => {
  res.send("Data fetched successfully");
});

app.post("/user", (req, res) => {
  res.send("Data saved Successfully");
});

app.delete("/user", (req, res) => {
  res.send("Data deleted Successfully");
});

app.listen(4800, () => {
  console.log("Server is running on port no. 4000");
});
