const express = require("express");

let bookStore = [
  { id: 1, name: "The Alchemist", author: "DevFlux" },
  { id: 2, name: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
  { id: 3, name: "Atomic Habits", author: "James Clear" },
  { id: 4, name: "The Power of Now", author: "Eckhart Tolle" },
  { id: 5, name: "The Subtle Art of Not Giving a Fuck", author: "Mark Manson" },
];

const app = express();

app.use(express.json());

// To get the whole data
app.get("/books", (req, res) => {
  res.send(bookStore);
});

// To get a specific data using id.
app.get("/books/:id", (req, res) => {
  //   console.log(req.params);
  const id = parseInt(req.params.id);
  const book = bookStore.find((item) => item.id === id);
  res.send(book);
});

// Get data according to query parameter.
app.get("/booksQuery", (req, res) => {
  const book = bookStore.filter((item) => item.author === req.query.author);

  // Handle Error.
  if (book.length === 0) {
    res.send(`Author:${req.query.author} Data Not Found`);
    return;
  }

  res.send(book);
});

// To add/create data
app.post("/books", (req, res) => {
  bookStore.push(req.body);
  res.send("Data saved Successfully");
});

// To delete data
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // bookStore = bookStore.filter((item) => item.id !== id); // This will loop through the array which is not efficient.
  const index = bookStore.findIndex((item) => item.id === id);

  // Handle Error.
  if (index === -1) {
    res.send(`ID:${id} Data Not Found`);
    return;
  }

  bookStore.splice(index, 1);
  res.send(`ID:${id} Data Deleted Successfully`);
});

// To update whole fields of that data.
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(req.body);
  const data = req.body;
  const index = bookStore.findIndex((item) => item.id === id);

  // Handle Error.
  if (index === -1) {
    res.send(`ID:${id} Data Not Found`);
    return;
  }

  bookStore[index] = { ...data };
  res.send(`ID:${id} Data Updated Successfully`);
});

// To update partial/single fields of that data
app.patch("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(req.body);
  const data = req.body;
  const index = bookStore.findIndex((item) => item.id === id);

  // Handle Error.
  if (index === -1) {
    res.send(`ID:${id} Data Not Found`);
    return;
  }

  bookStore[index] = { ...bookStore[index], ...data };
  res.send(`ID:${id} Data Updated Successfully`);
});

// To run the server
app.listen(4000, () => {
  console.log("Server is running on port no. 4000");
});
