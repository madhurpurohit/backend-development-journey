const express = require("express");
const User = require("../Models/user");
const userAuth = require("../Middleware/userAuthentication");
const allUsersRouter = express.Router();

allUsersRouter.get("/", userAuth, async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = allUsersRouter;
