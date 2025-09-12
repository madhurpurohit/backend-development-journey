const express = require("express");
const main = require("./mongoose");
const User = require("./Models/user");
const validate = require("./utils/validateUser");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./Middleware/userAuthentication");
require("dotenv").config();

const app = express();

app.use(express.json());

//* How to parse cookie.
app.use(cookieParser());

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

    //* How to use JWT.
    const jwtToken = jwt.sign({ email: person.email }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });

    //* How to send cookie.
    // res.cookie("userId", "iwuoebbmnvbdfksuj");
    res.cookie("token", jwtToken);

    res.status(200).send("Welcome, you're logged in");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/info", userAuth, async (req, res) => {
  try {
    const result = await User.find({});
    console.log(req.cookies);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/user", userAuth, async (req, res) => {
  try {
    //* How to verify.
    // const payload = jwt.verify(req.cookies.token, "DevFlux@123");

    const result = await User.findOne({ email: req.email });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/info/:id", userAuth, async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req._id) {
      await User.findByIdAndDelete(id);
      res.status(200).send("Deleted Successfully");
    } else {
      throw new Error("You're not the account owner, please login");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.patch("/info", userAuth, async (req, res) => {
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
