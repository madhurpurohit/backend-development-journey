import express from "express";
import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Go to /profile/:username or /product?query</h1>");
});

//* How to get one Dynamic parameter from url.
app.get("/profile/:username", (req, res) => {
  res.send(`<h1>Hii ${req.params.username}</h1>`);
});

//* How to get multiple Dynamic parameter from url. Here Slug is used by developers to identify any unique data like article title.
app.use("/profile/:username/article/:slug", (req, res) => {
  const filteredSlug = req.params.slug.replace(/-/g, " ");
  res.send(`<h1>Article ${req.params.username} by ${filteredSlug}</h1>`);
});

//* How to get query parameter from url.
app.use("/product", (req, res) => {
  res.send(
    `<h1>User search for ${req.query.search} under ${req.query.price}</h1>`
  );
});

app.listen(Number(process.env.PORT), () => {
  console.log(`Server is running on port no. ${process.env.PORT}`);
});
