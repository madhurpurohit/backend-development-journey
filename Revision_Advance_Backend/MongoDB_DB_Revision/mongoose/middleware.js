/*
 * In mongoose we can use middleware which is also known as hooks. There are many but some of them are validate, pre-save, post-save, pre-update, post-update, pre-delete, post-delete etc. Here pre means before the action and post means after the action. Like pre-save means before saving the document and post-save means after saving the document.

! Note:- We must use the middleware after schema is created. & before model is created. Otherwise it will not work.

todo Syntax:- Schema.pre('save', middlewareFunction); In this middleware we always use this keyword that's why we use normal function not arrow function. & we always pass a parameter call next in middlewareFunction, because it will move to the next middleware, or route handler.
 */

import mongoose from "mongoose";
import "dotenv/config";

//* Step1: Connect to DB or Mongo DB Server.
try {
  await mongoose.connect(
    `mongodb://${process.env.MONGO_URI}/${process.env.DATABASE_NAME1}`
  );
  mongoose.set("debug", true); // It will print all the query in console. It is very helpful for debugging.
} catch (error) {
  console.error(error);
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

//* Step3:- Use middleware to update updatedAt field on every update.
userSchema.pre(
  ["save", "updateOne", "updateMany", "findOneAndUpdate", "findManyAndUpdate"],
  function (next) {
    this.set({ updatedAt: Date.now() }); // Here we use set because in normal update we use $set, but in pre middleware we use set. Which means we want to set the updatedAt field on every update.
    next(); // This will move to the next middleware or route handler.
  }
);

//* Step4:- Create a Model.
const User = mongoose.model("User", userSchema);

//* Step5:- Create a document.
// await User.create({
//   name: "DevFlux",
//   email: "dev.flux@gmail.com",
//   age: 25,
// });

//* Step6:- Update a document.
await User.findOneAndUpdate(
  { email: "dev.flux@gmail.com" },
  { $set: { age: 28 } }
);

//* Step6:- Close the connection.
await mongoose.connection.close();
