/*
* Re-use common templates like headers, footer etc., using include.
! Syntax:
todo <%- include('header') %>
todo <h1>Welcome to my site</h1>
todo <%- include('footer') %>

* Here we always make sure header.ejs & footer.ejs are in our views folder.
* If they are inside a folder then use folder/header.
*/
import express from "express";
import "dotenv/config";

const app = express();

const student = [
  {
    name: "David",
    grade: "A",
    subject: "Maths",
  },
  {
    name: "DevFlux",
    grade: "A+",
    subject: "English",
  },
  {
    name: "Michael",
    grade: "C",
    subject: "Science",
  },
  {
    name: "John",
    grade: "B",
    subject: "Maths",
  },
];

app.set("view engine", "ejs");
// app.set("views", path.join(import.meta.dirname, "views"));

app.get("/partials", (req, res) => {
  res.render("template", { student });
});

app.listen(Number(process.env.PORT), () => {
  console.log(`Server is running on port no. ${process.env.PORT}`);
});
