import express from "express";
import "dotenv/config";
import path from "path";

const app = express();

//* How to serve a static file.
//? For Relative Path.
// app.use(express.static("public")); // Here express.static is a middleware.

//? For Absolute Path.
const staticPath = path.join(import.meta.dirname, "public");
app.use(express.static(staticPath));

//* How to send a File.
app.get("/", (req, res) => {
  //* To get the directory name like __dirname.
  console.log(import.meta.dirname);

  //* To get the file name like __filename.
  console.log(import.meta.url);

  //* If we want the absolute path of the file.
  const __filename = new URL(import.meta.url);
  console.log(__filename);
  console.log(__filename.pathname);

  //* How to send file from backend.
  const fileReference = path.join(import.meta.dirname, "public", "index.html");
  res.sendFile(fileReference);

  //   res.send("Hii");
});

app.listen(Number(process.env.PORT), () => {
  console.log(`Server is running on port no. ${process.env.PORT}`);
});

//! Note:- We can use import.meta.X in only newer version of Node.js (20.11.0+)
//? For older version.
/*
const __fileName = new URL(import.meta.url);
console.log(__fileName);
console.log(__fileName.pathname);

const __dirname = path.dirname(__fileName);
console.log(__dirname);
*/
