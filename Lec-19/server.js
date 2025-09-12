const express = require("express");
const main = require("./mongoose");
const User = require("./Models/user");
const validate = require("./utils/validateUser");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    validate(req.body);
    // Password Validate.
    req.body.password = await bcrypt.hash(req.body.password, 12);

    await User.create(req.body);
    res.status(200).send("Data Created Successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const person = await User.findById(req.body._id);
    const isUserPass = await bcrypt.compare(req.body.password, person.password);
    const isUserEmail = req.body.email === person.email;

    if (!isUserPass || !isUserEmail) {
      throw new Error("Invalid Email & Password login req");
    }
    res.status(200).send("Welcome, you're logged in");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/info", async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/info/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted Successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.patch("/info", async (req, res) => {
  try {
    const { _id, ...data } = req.body;
    await User.findByIdAndUpdate(_id, data, { runValidators: true });
    res.status(200).send("Updated Successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

main()
  .then(() => {
    console.log("Connected to Database");
    app.listen(Number(process.env.PORT), () => {
      console.log("Server is running on port no. 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
