import express from "express";
import path from "path";
import { shortenerRoutes } from "./routes/shortener.route.js";
import { envSchema } from "./config/env.js";

const app = express();

const staticPath = path.join(import.meta.dirname, "public");

app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));
app.use(shortenerRoutes);

//* How to set view engine.
app.set("view engine", "ejs");

//* If we have HTML file in views folder than we don't need to set the views folder. But if we don't have HTML file in views folder than we have to set the views folder.
// app.set("views", path.join(import.meta.dirname, "views"));

app.listen(envSchema.PORT, () => {
  console.log(`Server is running on port no. ${envSchema.PORT}`);
});
