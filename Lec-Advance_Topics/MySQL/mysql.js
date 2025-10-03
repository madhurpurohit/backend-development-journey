//* How to import mysql2 module in express.js/node.js?
import mysql from "mysql2/promise";
import "dotenv/config";

//* Step1:- To connect to mysql server.
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: `${process.env.PASSWORD}`,
  database: "mysql_db",
});

//* Step2:- Create a database.
// await db.execute("CREATE DATABASE IF NOT EXISTS mysql_db"); // Here CREATE DATABASE is a query, which is used to create a database. & IF NOT EXISTS is a condition, which is used to check if database already exists. & mysql_db is a database name.

console.log("Database created successfully");

//* Step3:- Create a Table.
// await db.execute(`
//     CREATE TABLE users(
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         username VARCHAR(100) NOT NULL,
//         email VARCHAR(100) NOT NULL UNIQUE
//     );
// `);

//* Step4:- Perform CRUD operations.

//! Insert one data.
//todo Method1: Inline statement, we don't use it. Because it is not secure.
// db.execute(`
//     INSERT INTO users(username, email)
//     VALUES("Madhur", "madhur@gmail.com");
// `);

//todo Method2:- Prepared Statement, we always use this. Because it is secure against SQL injection attacks
// db.query(
//   `
//   INSERT INTO users(username, email)
//   VALUES(?,?)
// `,
//   ["DevFlux", "dev.flux@gmail.com"]
// );

//? For all the query we can perform inline statement or prepared statement. But prepared statement is more secure. & We use prepared statement always.

//! Insert many data.
const values = [
  ["ALice", "alice@gmail.com"],
  ["Bob", "bob@gmail.com"],
  ["Charlie", "charlie@gmail.com"],
  ["David", "david@gmail.com"],
];

// db.query(
//   `
//     INSERT INTO users(username, email)
//     VALUES ?
// `,
//   [values]
// );

//! Update data.
// db.execute(`
//     UPDATE users
//     SET username = "Alicia"
//     WHERE email="alice@gmail.com";
// `)

//! Delete data.
// db.execute(`
//     DELETE FROM users WHERE email="bob@gmail.com";
// `)

//! Read data.
const [rows] = await db.execute(`SELECT * FROM users`); // It will give us an array of arrays, means inside this array tow more arrays are present. First array is for rows & second array is for column/field. First array contains all the rows & second array contains all the columns. That's why we use destructuring to get the rows.
console.log(rows);

//* Step5:- Close the connection.
db.end();
