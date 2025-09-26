/*
 * Use a middleware function with no specific route, like app.use({req, res}=>{...}), to handle unmatched routes.
 * Inside the middleware, send a 404 status using res.status(404) & a custom message or HTML response.
 * Place the middleware after all defined routes to catch only unhandled or unmatched requests.
 */

import express from "express";
import "dotenv/config";
import path from "path";

const app = express();

const staticPath = path.join(import.meta.dirname, "public");
app.use(express.static(staticPath));

app.use((req, res) => {
  //   res.status(404).send("Error 404, page Not Found");
  const staticPath = path.join(import.meta.dirname, "views");
  res.status(404).sendFile(path.join(staticPath, "404.html"));
});

app.listen(Number(process.env.PORT), () => {
  console.log(`Server is running on port no. ${process.env.PORT}`);
});
