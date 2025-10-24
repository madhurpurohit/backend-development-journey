//* How to connect to MySQL localhost using drizzle ORM?
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";

export const db = drizzle(process.env.DATABASE_URL);

//* How to connect MySQL to Aiven Cloud?
// import "dotenv/config";
// import { drizzle } from "drizzle-orm/mysql2";
// import mysql from "mysql2/promise";
// import fs from "fs";
// import path from "path";

// // Create a connection pool with SSL options
// const pool = mysql.createPool({
//   uri: process.env.DATABASE_URL,
//   ssl: {
//     // Read the CA certificate from the downloaded file
//     ca: fs.readFileSync(path.join(process.cwd(), "ca.pem")),
//   },
// });

// // Pass the connection pool to Drizzle
// export const db = drizzle(pool);
