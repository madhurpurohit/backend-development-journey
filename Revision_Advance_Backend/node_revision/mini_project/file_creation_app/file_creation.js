import readline from "readline";
import path from "path";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const createFile = () => {
  rl.question("Enter the file name: ", (fileName) => {
    rl.question("Enter the file content: ", (fileContent) => {
      fs.writeFile(`${fileName}.txt`, fileContent, (err) => {
        if (err) console.error(err);
        else {
          console.log(`File "${fileName}.txt" created successfully!`);
        }
      });
      rl.close();
    });
  });
};

createFile();
