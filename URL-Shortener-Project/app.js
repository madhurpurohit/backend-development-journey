import express from "express";
import path from "path";
import { shortenerRoutes } from "./routes/shortener.route.js";
import { envSchema } from "./config/env.js";
import { authRoutes } from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { verifyAuthentication } from "./middlewares/varify-auth.middleware.js";
import session from "express-session";
import flash from "connect-flash";

const app = express();

const staticPath = path.join(import.meta.dirname, "public");

app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));

//* How to parse cookie.
app.use(cookieParser());

//* How to save session using express-session?
app.use(session({ secret: "Madhur", resave: true, saveUninitialized: false }));
app.use(flash());

//* Add middleware where we can check that user is logged in or not.
app.use(verifyAuthentication);

//! How the below middleware Works:
//* This middleware runs on every request before reaching the route handlers.
//? res.locals is an object that persists throughout the request-response cycle.
//* If req.user exists (typically from authentication, like Passport.js), it's stored in req.locals.user.
//todo Views (like EJS, Pug or Handlebars) can directly access user without manually passing it in every route.
app.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
});

app.use(authRoutes);
app.use(shortenerRoutes);

//* How to set view engine.
app.set("view engine", "ejs");

app.listen(envSchema.PORT, () => {
  console.log(`Server is running on port no. ${envSchema.PORT}`);
});
