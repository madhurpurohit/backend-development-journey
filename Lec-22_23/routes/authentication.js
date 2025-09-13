const express = require("express");
const User = require("../Models/user");
const validate = require("../utils/validateUser");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    validate(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 12);

    await User.create(req.body);
    res.status(200).send("Data Created Successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const person = await User.findOne({ email: req.body.email });
    if (!person) {
      throw new Error("Invalid Email & Password login req");
    }
    const isUserPass = await bcrypt.compare(req.body.password, person.password);

    if (!isUserPass) {
      throw new Error("Invalid Email & Password login req");
    }
    res.cookie("token", person.getJWT());

    res.status(200).send("Welcome, you're logged in");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//* For logout feature we have total two methods
authRouter.post("/logout", async (req, res) => {
  try {
    //* Method1:- Send a dummy token.
    // res.cookie("token", "sdgfsaifgkas");

    //* Method2:- Set instant expire on cookie
    res.cookie("token", null, { expires: new Date(Date.now()) });

    res.status(200).send("Logout Successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = authRouter;
