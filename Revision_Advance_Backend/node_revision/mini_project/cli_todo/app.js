import readline from "readline";
import path from "path";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const todoListPath = path.join(process.cwd(), "todoList.json");

const getTodosFromJson = () => {
  try {
    const data = fs.readFileSync(todoListPath);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveTodosToJson = (todos) => {
  try {
    const data = JSON.stringify(todos);
    fs.writeFileSync(todoListPath, data);
  } catch (error) {
    console.log("Error occurred while saving the tasks!");
  }
};

const showMenu = () => {
  console.log("\n1. Add a task");
  console.log("2. List all tasks");
  console.log("3. Mark a task as complete");
  console.log("4. Exit");

  rl.question("Enter your choice:  ", handleInput);
};

const handleInput = (choice) => {
  const todos = getTodosFromJson();
  if (choice === "1") {
    rl.question("\nEnter the task:  ", (task) => {
      todos.push(task);
      saveTodosToJson(todos);
      console.log("Task added successfully!");
      showMenu();
    });
  } else if (choice === "2") {
    if (todos.length === 0) {
      console.log("\nNo tasks found!, Please add a task.");
    } else {
      console.log("\nYour Tasks:");
      todos.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
      });
    }
    showMenu();
  } else if (choice === "3") {
    if (todos.length === 0) {
      console.log("\nNo tasks found!, Please add a task.");
      showMenu();
    } else {
      rl.question("\nEnter the task number to mark as complete:", (index) => {
        if (index > 0 && index <= todos.length) {
          todos.splice(index - 1, 1);
          saveTodosToJson(todos);
          console.log("Task marked as complete!");
        } else {
          console.log("Invalid task number!");
        }
        showMenu();
      });
    }
  } else if (choice === "4") {
    rl.close();
  } else {
    console.log("\nInvalid choice!");
    showMenu();
  }
};

showMenu();
