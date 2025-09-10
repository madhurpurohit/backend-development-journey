const express = require("express");
const main = require("./mongoose");
const User = require("./Models/user");

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const mandatoryField = ["firstName", "age", "email"];
    // const isAllowed = Object.keys(req.body).every(task => mandatoryField.includes(task));
    const isAllowed = mandatoryField.every((task) =>
      Object.keys(req.body).includes(task)
    );

    if (isAllowed) {
      await User.create(req.body);
      res.status(200).send("Data Created Successfully");
    } else {
      throw new Error("Missing some required information");
    }
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
    app.listen(4000, () => {
      console.log("Server is running on port no. 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
