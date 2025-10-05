import express from "express";
import path from "path";
import { shortenerRoutes } from "./routes/shortener.route.js";
import { envSchema } from "./config/env.js";
import { authRoutes } from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();

const staticPath = path.join(import.meta.dirname, "public");

app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));

//* How to parse cookie.
app.use(cookieParser());

app.use(authRoutes);
app.use(shortenerRoutes);

//* How to set view engine.
app.set("view engine", "ejs");

app.listen(envSchema.PORT, () => {
  console.log(`Server is running on port no. ${envSchema.PORT}`);
});
