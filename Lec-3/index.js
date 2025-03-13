const fs = require("fs"); // For doing file related operations.

let a = 10;
let b = "Hello ji";

console.log(b);

function sum(a, b) {
  return a + b;
}

//* File Operation in synchronous way like JS behavior.
// const data = fs.readFileSync("Lec-3/data.json", "utf-8");
// console.log(data);

//* File Operation in asynchronous way.
fs.readFile("Lec-3/data.json", "utf-8", (err, res) => {
  console.log(res);
});

setTimeout(() => {
  console.log("Hello Time Out");
}, 3000);

console.log(a);
console.log(sum(3, 8));
