const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(`${process.env.DB_SECRET_KEY}/InstagramAuth`);
}

module.exports = main;
