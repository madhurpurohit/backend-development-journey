console.log("Hello I am second.");

function sum(a, b) {
  console.log(a + b);
}

// To export any function & use it in main while where we use require().
module.exports = sum;
