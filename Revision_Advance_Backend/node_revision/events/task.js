//? Challenge: "Event Maestro: Handle It All!"

//! Objective
//* Create a program using Node.js EventEmitter that:

//? Listens for multiple types of user events (e.g., login, logout, purchase, and profile update).
//? Tracks how many times each event is emitted.
//? Logs a summary of all event occurrences when a special summary event is triggered.

//! Requirements
//? Create at least four custom events (e.g., user-login, user-logout, user-purchase, profile-update).
//? Emit these events multiple times with different arguments (e.g., username, item purchased).
//? Track and store the count of each event type.
//? Define a summary event that logs a detailed report of how many times each event was triggered.

const EventEmitter = require("events");

const emitter = new EventEmitter();

const fs = require("fs");

const eventCountsFile = "eventCounts.json";

let eventCounts;

try {
  const data = fs.readFileSync(eventCountsFile, "utf8");
  eventCounts = JSON.parse(data);
} catch (error) {
  eventCounts = {
    "user-login": 0,
    "user-logout": 0,
    "user-purchase": 0,
    "profile-update": 0,
  };
}

// Event listeners
emitter.on("user-login", (username) => {
  eventCounts["user-login"]++;
  console.log(`${username} logged in!`);
});

emitter.on("user-purchase", (username, item) => {
  eventCounts["user-purchase"]++;
  console.log(`${username} purchased ${item}!`);
});

emitter.on("profile-update", (username, field) => {
  eventCounts["profile-update"]++;
  console.log(`${username} updated their ${field}!`);
});

emitter.on("user-logout", (username) => {
  eventCounts["user-logout"]++;
  console.log(`${username} logged out!`);
});

emitter.on("summary", () => {
  console.log(eventCounts);
});

// Emit some events
emitter.emit("user-login", "DevFlux");
emitter.emit("user-purchase", "DevFlux", "Laptop");
// emitter.emit("profile-update", "DevFlux", "email");
// emitter.emit("user-logout", "DevFlux");

// Show the summary
emitter.emit("summary");

// This code runs when the Node.js process exits.
// It writes the eventCounts object to a file named eventCounts.json.
// The JSON.stringify() method is used to convert the object to a JSON string.
// The null and 2 arguments to JSON.stringify() specify that the output should be formatted with no extra whitespace, and that each property should be indented with 2 spaces.
process.on("exit", () => {
  console.log("Process exiting, writing event counts to file...");
  fs.writeFileSync(eventCountsFile, JSON.stringify(eventCounts, null, 2));
  console.log("Event counts file written.");
});
