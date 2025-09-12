const express = require("express");
const app = express();
const User = require("./Models/user");
const main = require("./mongooseConnectDB");

app.use(express.json());

//* How to create get request;
app.get("/info", async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

//* How to get specific document.
app.get("/info/:name", async (req, res) => {
  try {
    // const result = await User.find({ name: `${req.params.name}` }); // If we want whole document.
    const result = await User.find(
      { name: `${req.params.name}` },
      `name age city`
    ); // If we want specific fields from document.
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//* How to create & insert Document.
app.post("/info", async (req, res) => {
  console.log(typeof req.body);
  try {
    await User.create(req.body);
    res.status(200).send("Document Stored Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

//* How to delete a document.
app.delete("/info", async (req, res) => {
  console.log(req.query);
  try {
    const query = {};
    if (req.query.name) query.name = `${req.query.name}`;
    if (req.query.age) query.age = Number(req.query.age);
    if (req.query.city) query.city = `${req.query.city}`;
    if (req.query.gender) query.gender = `${req.query.gender}`;
    // const result = await User.deleteOne(query);
    const result = await User.deleteMany(query);
    if (result.deletedCount === 0)
      return res.status(404).send("Document Not Found");
    res.status(200).send("Deleted Document Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

//* How to update single field in specific document.
app.patch("/info", async (req, res) => {
  console.log(req.query);
  try {
    if (req.query.age)
      await User.updateOne(
        { name: `${req.query.name}` },
        { age: req.query.age }
      );
    if (req.query.city)
      await User.updateOne(
        { name: `${req.query.name}` },
        { city: `${req.query.city}` }
      );
    if (req.query.changeName)
      await User.updateOne(
        { name: `${req.query.name}` },
        { name: `${req.query.changeName}` }
      );
    if (req.query.gender)
      await User.updateOne(
        { name: `${req.query.name}` },
        { gender: `${req.query.gender}` }
      );

    res.status(200).send("Updated Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

//* How to update all fields in specific document.
app.put("/info/:name", async (req, res) => {
  try {
    await User.updateOne({ name: `${req.params.name}` }, { ...req.body });
    res.status(200).send("Updated full document successfully.");
  } catch (error) {
    res.status(500).send(error);
  }
});

//* How to start server after establish a connection b/w Backend & Database.
main()
  .then(() => {
    console.log("Connected to DB");
    app.listen(Number(process.env.PORT), () => {
      console.log("Server is running on port no. 4000");
    });
  })
  .catch((err) => console.log(err));
