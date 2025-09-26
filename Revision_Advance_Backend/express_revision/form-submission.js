import express from "express";
import "dotenv/config";
import path from "path";

const app = express();

//* How to get form data which we get as body. For this we firstly have to parse the data from body. Otherwise it will show undefined.
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true })); //* It is used to parse incoming requests with URL-encoded payloads. URL-encoded means that the data is encoded as a string of key-value pairs separated by ampersands (&).
//todo The urlencoded() option {extended : true} uses the qs library to parse the query string, allowing for more complex structures like nested objects and arrays, which the default parser cannot handle.

const staticPath = path.join(import.meta.dirname, "public");
app.use(express.static(staticPath));

// app.get("/contact", (req, res) => {
//   console.log(req.query);
//   res.redirect("/"); // This will redirect to home page.
// });

app.post("/contact", (req, res) => {
  console.log(req.body);
  res.redirect("/"); // This will redirect to home page.
});

app.listen(Number(process.env.PORT), () => {
  console.log(`Server is running on port no. ${process.env.PORT}`);
});
