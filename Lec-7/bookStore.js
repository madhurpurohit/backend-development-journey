const express = require("express");

const bookStore = [
  { id: 1, name: "The Alchemist", author: "DevFlux" },
  { id: 2, name: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
  { id: 3, name: "Atomic Habits", author: "James Clear" },
  { id: 4, name: "The Power of Now", author: "Eckhart Tolle" },
  { id: 5, name: "The Subtle Art of Not Giving a Fuck", author: "Mark Manson" },
];

const app = express();

app.use(express.json());

app.get("/books", (req, res) => {
  res.send(bookStore);
});

app.get("/books/:id", (req, res) => {
//   console.log(req.params);
  const id = parseInt(req.params.id);
  const book = bookStore.find((item) => item.id === id);
  res.send(book);
});

app.post("/books", (req, res) => {
  bookStore.push(req.body);
  res.send("Data saved Successfully");
});

app.listen(4000, () => {
  console.log("Server is running on port no. 4000");
});
