const express = require("express");
const main = require("./mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const userRouter = require("./routes/user");
const authRouter = require("./routes/authentication");
const allUsersRouter = require("./routes/fullDBUsers");
const redisClient = require("./config/redis");
const rateLimiter = require("./ratelimiter/slidingWindowRateLimiter");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(rateLimiter);

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/users", allUsersRouter);

const initServer = async () => {
  try {
    Promise.all([redisClient.connect(), main()]);
    console.log("Connected To DB");

    app.listen(Number(process.env.PORT), () => {
      console.log("Server is running on port no. 4000");
    });
  } catch (error) {
    console.log(error.message);
  }
};

initServer();
