//* How we can get createdAt & updatedAt field in mongoose, without explicitly adding them in schema? & also how to update the value of updatedAt field on every update without using middleware?
import mongoose from "mongoose";
import "dotenv/config";

try {
  await mongoose.connect(
    `mongodb://${process.env.MONGO_URI}/${process.env.DATABASE_NAME1}`
  );
  mongoose.set("debug", true);
} catch (error) {
  console.error(error);
  process.exit();
}

const userSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

// await User.create({
//   name: "David",
//   email: "dev.david@gmail.com",
//   age: 25,
// });

await User.findOneAndUpdate({ name: "David" }, { age: 28 });

await mongoose.connection.close();
