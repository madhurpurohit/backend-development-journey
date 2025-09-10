const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(
    "mongodb+srv://madhurPurohit:Madhur7610@learnmongodb.mhkz6cu.mongodb.net/Instagram"
  );
}

module.exports = main;
