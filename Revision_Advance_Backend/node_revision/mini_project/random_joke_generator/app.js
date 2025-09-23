//* Method1:-
import https from "https";
import chalk from "chalk";

const getJoke = () => {
  const url = "https://official-joke-api.appspot.com/random_joke";
  https.get(url, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });
    response.on("end", () => {
      const joke = JSON.parse(data);
      console.log(`Here is a random ${chalk.green(joke.type)} Joke: `);
      console.log(chalk.red(joke.setup));
      console.log(chalk.white.bgMagenta.bold(joke.punchline));
    });
  });
};

getJoke();

//* Method2:- Using Fetch API
// const url = "https://official-joke-api.appspot.com/random_joke";

// const randomJoke = async () => {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data.setup);
//     console.log(data.punchline);
//   } catch (error) {
//     console.log("Error: ", error.message);
//   }
// };

// randomJoke();
