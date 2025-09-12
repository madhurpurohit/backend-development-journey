const mongoose = require("mongoose");
require("dotenv").config();

async function main() {
  await mongoose.connect(`${process.env.DB_SECRET_KEY}/Instagram`);
}

module.exports = main;
