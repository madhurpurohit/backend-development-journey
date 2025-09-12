const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      minLength: 2,
      maxLength: 20,
      required: true,
    },
    lastName: {
      type: String,
      minLength: 2,
      maxLength: 20,
    },
    age: {
      type: Number,
      min: 15,
      max: 90,
      required: true,
    },
    gender: {
      type: String,
      // enum: ["Male", "Female", "Others"],
      validate: {
        validator: function (value) {
          if (!["Male", "Female", "Others"].includes(value)) {
            throw new Error("Invalid Gender");
          }
        },
      },
    },
    email: {
      type: String,
      required: true,
      immutable: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "This is pic url",
    },
  },
  { timestamps: true } // It automatically adds createdAt & updatedAT key & value as time in which the operation is perform.
);

const User = mongoose.model("User", userSchema, "user");

module.exports = User;
