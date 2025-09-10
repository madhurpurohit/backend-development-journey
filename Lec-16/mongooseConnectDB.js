const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(
    "mongodb+srv://madhurPurohit:Madhur7610@learnmongodb.mhkz6cu.mongodb.net/Books"
  );
}

module.exports = main;
