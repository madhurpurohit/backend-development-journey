import express from "express";
import "dotenv/config";
import path from "path";

const app = express();

// In newer version of Node.js (14.8+), we can use top-level await without needing to wrap it in an async function.
const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const data = await response.json();
console.log(data);

const staticPath = path.join(import.meta.dirname, "public");
app.use(express.static(staticPath));

app.listen(Number(process.env.PORT), () => {
  console.log(`Server is running on port no. ${process.env.PORT}`);
});

//! What is Top-Level Await?
//* Top-level await is a feature in Node.js that allows us to use await outside of an async function.
