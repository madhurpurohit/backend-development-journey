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

// Convert JSON Body Data into JS Object. It is a middleware.
app.use(express.json());

app.use("/admin", (req, res, next) => {
  // Authenticate the user that it is admin or not?. Authentication Middleware. Here we use dummy code not the actual logic.
  const token = "ABCDEF";
  const access = token === "ABCDEF";

  if (!access) {
    res.status(403).send("No Permission");
  } else {
    next();
  }
});

// To send all the data of foodMenu.
app.get("/admin", (req, res) => {
  res.status(200).send(foodMenu);
});

// To add data into foodMenu.
app.post("/admin", (req, res) => {
  foodMenu.push(req.body);
  res.status(200).send("Data added successfully");
});

// To delete any food from foodMenu.
app.delete("/admin/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = foodMenu.findIndex((item) => item.id === id);
  if (index === -1) {
    res.status(204).send(`ID:${id} Data not found`);
  } else {
    foodMenu.splice(index, 1);
    res.status(200).send(`ID:${id} Data is deleted`);
  }
});

// To update single field.
app.patch("/admin/:id", (req, res) => {
  const id = parseInt(req.params.id);
  //?   let food = foodMenu.find((item) => item.id === id); // Here because foodMenu is object than it will copy it as an shallow copy, so change in food is also modify the original foodMenu.
  const index = foodMenu.findIndex((item) => item.id === id);

  if (index !== -1) {
    //? food = { ...food, ...req.body }; // Here we allocate it to a new address because we made another object.
    foodMenu[index] = { ...foodMenu[index], ...req.body };
    res.status(200).send(`ID:${id} Data update successfully.`);
  } else {
    res.status(204).send(`ID:${id} Data not found`);
  }
});

// To update the whole field of food Data.
app.put("/admin/:id", (req, res) => {
  const id = parseInt(req.params.id);
  //?   let food = foodMenu.find((item) => item.id === id); // Here because foodMenu is object than it will copy it as an shallow copy, so change in food is also modify the original foodMenu.
  const index = foodMenu.findIndex((item) => item.id === id);

  if (index !== -1) {
    //? food = { ...req.body };
    foodMenu[index] = { ...req.body };
    res.status(200).send(`ID:${id} Data update successfully.`);
  } else {
    res.status(204).send(`ID:${id} Data not found`);
  }
});

app.listen(4800, () => {
  console.log("Server is running on port no. 4800");
});
