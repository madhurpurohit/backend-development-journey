const express = require("express");
const User = require("../Models/user");
const userAuth = require("../Middleware/userAuthentication");
const userRouter = express.Router();

userRouter.get("/", userAuth, async (req, res) => {
  try {
    const result = await User.findOne({ email: req.email });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

userRouter.delete("/:id", userAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ email: req.email });
    if (id == user._id) {
      await User.findByIdAndDelete(id);
      res.status(200).send("Deleted Successfully");
    } else {
      throw new Error("You're not the account owner, please login");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

userRouter.patch("/", userAuth, async (req, res) => {
  try {
    const { _id, ...data } = req.body;
    const user = await User.findOne({ email: req.email });
    if (_id == user._id) {
      await User.findByIdAndUpdate(_id, data, { runValidators: true });
      res.status(200).send("Updated Successfully");
    } else {
      throw new Error("You're not the account owner, please login");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = userRouter;
