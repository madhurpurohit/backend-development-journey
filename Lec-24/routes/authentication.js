const express = require("express");
const User = require("../Models/user");
const validate = require("../utils/validateUser");
const bcrypt = require("bcrypt");
const redisClient = require("../config/redis");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const userAuth = require("../Middleware/userAuthentication");

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

//* For logout feature we have total three methods
authRouter.post("/logout", userAuth, async (req, res) => {
  try {
    //* Method1:- Send a dummy token.
    // res.cookie("token", "sdgfsaifgkas");

    //* Method2:- Set instant expire on cookie
    // res.cookie("token", null, { expires: new Date(Date.now()) });

    //* Method3:- Using Redis DB.
    const { token } = req.cookies;

    //* Get data or Decode Token
    const payload = await jwt.decode(token);

    //* set token in Redis.
    await redisClient.set(`token:${token}`, "Blocked");

    //* Set Expiry in Second from now.
    // await redisClient.expire(`token:${token}`, 1800);

    //* Set Expiry in seconds from 1 Jan 1970.
    await redisClient.expireAt(`token:${token}`, payload.exp);

    await res.status(200).send("Logout Successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = authRouter;
