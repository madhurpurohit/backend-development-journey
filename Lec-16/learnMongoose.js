const mongoose = require("mongoose");
const { Schema } = require("mongoose");

async function main() {
  await mongoose.connect(
    "mongodb+srv://madhurPurohit:Madhur7610@learnmongodb.mhkz6cu.mongodb.net/Books"
  );

  //* How to create Schema.
  const userSchema = new Schema({
    name: String,
    age: Number,
    city: String,
    gender: String,
  });

  //* How to create Model or we can say that Collection. Here it will link Model to collection.
  //todo Syntax:- const ModelName = mongoose.model("ModelName", schemaName, "CollectionName"); // Here if we don't write collection name than it will create collection name using ModelName, firstly it converts ModelName into small letters & than add s at the last.
  // const User = mongoose.model("User", userSchema); // In this collection name will be users.
  const User = mongoose.model("User", userSchema, "user"); // In this collection name will be user.

  //* How to create & insert one document?
  //! Method1: Syntax:- const vName= new ModelName({data});  await vName.save(); // Here .save() will use Network call.
  const user1 = new User({
    name: "DevFlux",
    age: 25,
    city: "India",
    gender: "Male",
  });
  await user1.save();

  //! Method2: Syntax:- await User.create({data});
  await User.create({ name: "David", age: 40, city: "US", gender: "Male" });

  //* How to create multiple document & store it?
  //! Syntax:- await ModelName.insertMany([{data1}, {data2}, {data3}]);
  await User.insertMany([
    { name: "Sneha", age: 23, city: "India", gender: "Female" },
    { age: 40, city: "Bhutan" },
    { city: "England", gender: "Female" },
  ]);

  //* How to get all documents?
  //! Syntax:- await ModelName.find({});
  const ans = await User.find({});
  console.log(ans);

  //* How to get particular document which has that data basically filtering?
  //! Syntax:- await ModelName.find({field});
  const result = await User.find({ name: "DevFlux" });
  console.log(result);
}

main()
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));
