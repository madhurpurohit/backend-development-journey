const express = require("express");
const main = require("./mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const userRouter = require("./routes/user");
const authRouter = require("./routes/authentication");
const allUsersRouter = require("./routes/fullDBUsers");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/users", allUsersRouter);

main()
  .then(() => {
    console.log("Connected to Database");
    app.listen(Number(process.env.PORT), () => {
      console.log(`Server is running on port no. ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
