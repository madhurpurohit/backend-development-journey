import mongoose from "mongoose";
import "dotenv/config";

//* Step1: Connect to DB or Mongo DB Server.
try {
  await mongoose.connect(
    `mongodb://${process.env.MONGO_URI}/${process.env.DATABASE_NAME}`
  );
  mongoose.set("debug", true); // It will print all the query in console. It is very helpful for debugging.
} catch (error) {
  console.error(error);
  process.exit(); // It means process will exit.
}

//* Step2:- Create a Schema.
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

//* Step3:- Create a Model.
const User = mongoose.model("User", userSchema, "user");

//* Step4:- Create a Document.
//todo Method1:- Syntax:- const vName= new ModelName({data});  await vName.save();
// const user = new User({
//   name: "DevFlux",
//   email: "dev.flux@gmail.com",
//   age: 25,
// });
// await user.save();

//todo Method2:- Syntax:- await ModelName.create({data});
await User.create({
  name: "DevFlux",
  email: "dev.flux@gmail.com",
  age: 25,
});

//* Step4:- Close the connection.
//todo Method1:- Syntax:- await mongoose.disconnect();
// await mongoose.disconnect(); // This method will close the connection to DB.

//todo Method2:- Syntax:- await mongoose.connection.close();
await mongoose.connection.close(); // This method will close the connection to DB.

//! Between Method1 & Method2 of Step4, professionally we prefer Method2.

//* Step5:- Drop a Collection. It means delete a Collection from DB, so that we can create new Collection with same name.
// await User.collection.drop();
