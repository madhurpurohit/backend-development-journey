import express from "express";
import "dotenv/config";
import path from "path";
import { shortenerRoutes } from "./routes/shortener.route.js";

const app = express();

const port = Number(process.env.PORT) || 4000; // Default port is 4000

const staticPath = path.join(import.meta.dirname, "public");

app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));
app.use(shortenerRoutes);

app.listen(port, () => {
  console.log(`Server is running on port no. ${port}`);
});
