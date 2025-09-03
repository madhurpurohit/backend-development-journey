console.log("Hello I am third");

function multiply(a, b) {
  console.log(`Multiplication of ${a} & ${b} is: ${a * b}`);
}

function divide(a, b) {
  console.log(`Division of ${a} & ${b} is: ${a / b}`);
}

function subtraction(a, b) {
  console.log(`Subtraction of ${a} & ${b} is: ${a - b}`);
}

module.exports = { multiply, divide, subtraction };
