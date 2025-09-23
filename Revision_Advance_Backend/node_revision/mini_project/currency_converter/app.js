// import dotenv from "dotenv";
// dotenv.config();

import "dotenv/config"; // It will load all the environment variables from .env file. & Works as same as above.
import https from "https";
import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;

https.get(url, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data += chunk;
  });
  response.on("end", () => {
    const exchangeRateList = JSON.parse(data).conversion_rates;
    rl.question("Enter the amount in USD: ", (amount) => {
      rl.question(
        "Enter the target currency (e.g. INR, EUR, JPY): ",
        (targetCurrency) => {
          if (exchangeRateList[targetCurrency.toUpperCase()]) {
            const convertedAmount = (
              amount * exchangeRateList[targetCurrency.toUpperCase()]
            ).toFixed(2);
            console.log(
              chalk.green(
                `${amount} USD is equal to ${convertedAmount} ${targetCurrency.toUpperCase()}`
              )
            );
          } else {
            console.log(`Invalid target currency: ${targetCurrency}`);
          }
          rl.close();
        }
      );
    });
  });
});
