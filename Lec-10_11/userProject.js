const express = require("express");

const app = express();

const foodMenu = [
  { id: 1, food: "Chicken Curry", category: "non-veg", price: 1200 },
  { id: 2, food: "Veg Biryani", category: "veg", price: 800 },
  { id: 3, food: "Paneer Butter Masala", category: "veg", price: 900 },
  { id: 4, food: "Grilled Chicken", category: "non-veg", price: 1400 },
  { id: 5, food: "Masala Dosa", category: "veg", price: 400 },
  { id: 6, food: "Fish Fry", category: "non-veg", price: 1500 },
  { id: 7, food: "Chole Bhature", category: "veg", price: 600 },
  { id: 8, food: "Mutton Biryani", category: "non-veg", price: 1600 },
  { id: 9, food: "Aloo Paratha", category: "veg", price: 300 },
  { id: 10, food: "Chicken Tikka", category: "non-veg", price: 1300 },
  { id: 11, food: "Idli Sambar", category: "veg", price: 350 },
  { id: 12, food: "Beef Steak", category: "non-veg", price: 2000 },
  { id: 13, food: "Palak Paneer", category: "veg", price: 950 },
  { id: 14, food: "Egg Curry", category: "non-veg", price: 700 },
  { id: 15, food: "Veg Pizza", category: "veg", price: 1100 },
  { id: 16, food: "Prawns Curry", category: "non-veg", price: 1700 },
  { id: 17, food: "Veg Pulao", category: "veg", price: 750 },
  { id: 18, food: "Fish Curry", category: "non-veg", price: 1550 },
  { id: 19, food: "Noodles", category: "veg", price: 500 },
  { id: 20, food: "Chicken Burger", category: "non-veg", price: 850 },
];

const cartItem = [];

app.use(express.json());

// Get all item from cart/see cart.
app.get("/user", (req, res) => {
  if (cartItem.length !== 0) res.status(200).send(cartItem);
  else res.status(204).send("No cart item has been added.");
});

// Add to cart functionality
app.post("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = foodMenu.findIndex((cartItem) => cartItem.id === id);

  if (index !== -1) {
    cartItem.push(foodMenu[index]);
    res.status(200).send(`ID:${id} Data is added.`);
  } else {
    res.status(204).send(`ID:${id} Data is not found`);
  }
});

// Delete item from cart.
app.delete("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cartItem.findIndex((item) => item.id === id);

  if (index !== -1) {
    cartItem.splice(index, 1);
    res.status(200).send("Data deleted successfully");
  } else {
    res.status(204).send("Data not found");
  }
});

//! Error Handling:- When we connect to DB or when we parse a JSON data, than sometimes we can't connect DB & parse data. In this case it will throw an error, if we don't handle/tackle it than our application will be crashed. To handle error we use tryCatch block. & to throw error we use "throw new Error("msg")". This throw will be written into try block.
app.get("/error", (req, res) => {
  try {
    // JSON.parse({ name: "DevFlux" }); // It is not a valid JSON because it is not in the form of String.
    throw new Error("Invalid JSON."); // If we want that it will throw error than we have to comment above line JSON.parse(). It will redirect to catch block & below line of code will not run.
    res.send("Hello Ji");
  } catch (error) {
    res.send("Some error occurred " + error);
  }
});

app.listen(4800, () => {
  console.log("Server is running on port no. 4800");
});
