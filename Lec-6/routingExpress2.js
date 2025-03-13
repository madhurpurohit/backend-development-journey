const express = require("express");

const app = express();

//* In the below code ? means letter which came before ? is become optional, & localhost:4800/about Or localhost:4800/abot, gives same output.
app.use("/abou?t", (req, res) => {
  res.send("Hello, I am About Page");
});

//* In the below code + means letter which came before + is used as many time as we want, So localhost:4800/contact Or localhost:4800/contaaaaaaaaact gives same output.
app.use("/conta+ct", (req, res) => {
  res.send("Hello, I am Contact Page");
});

//* In the below code * means in the place of * we can write anything but at last s will always come, so localhost:4800/details Or localhost:4800/detail$5%gdfs gives same output
app.use("/detail*s", (req, res) => {
  res.send("Hello, I am details page.");
});

//* In the below code :id means in this place anything we write will automatically pass as a parameter to id, So localhost:4800/67/mp gives the result. In if we use localhost:4800/info Or localhost:4800/info/67 than it will still show default Home page.
app.use("/info/:id/:user", (req, res) => {
  console.log(req.params);
  res.send("Hello, I am Information Page.");
});

app.use("/", (req, res) => {
  res.send("Hello, I am Home Page");
});

app.listen(4800, () => {
  console.log("Server is running on port no. 4500");
});
