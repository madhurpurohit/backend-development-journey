import https from "https";
import chalk from "chalk";
import readline from "readline";
import "dotenv/config";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getWeather = () => {
  rl.question("Enter the city name: ", (cityName) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${cityName}&aqi=no`;
    https.get(url, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        const weatherData = JSON.parse(data);
        console.log(`\n Weather Information:`);
        console.log(`City: ${chalk.green(weatherData.location.name)}`);
        console.log(`Country: ${chalk.green(weatherData.location.country)}`);
        console.log(
          `Temperature: ${chalk.green(weatherData.current.temp_c)}°C`
        );
        console.log(`Humidity: ${chalk.green(weatherData.current.humidity)}%`);
        console.log(
          `Wind Speed: ${chalk.green(weatherData.current.wind_kph)} km/h`
        );
        console.log(
          `Weather Condition: ${chalk.green(
            weatherData.current.condition.text
          )}`
        );
      });
    });
    rl.close();
  });
};

getWeather();
