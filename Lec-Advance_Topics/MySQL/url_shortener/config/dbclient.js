import mysql from "mysql2/promise";
import { envSchema } from "./env.js";

// console.log(envSchema)

const db = await mysql.createConnection({
  host: envSchema.HOST,
  user: envSchema.USER_NAME,
  password: envSchema.PASSWORD,
  database: envSchema.DATABASE_NAME,
});

await db.execute(`CREATE DATABASE IF NOT EXISTS ${envSchema.DATABASE_NAME}`);

await db.execute(`CREATE TABLE IF NOT EXISTS shortener(
    id INT AUTO_INCREMENT PRIMARY KEY,
    shortCode VARCHAR(50) NOT NULL UNIQUE,
    url TEXT NOT NULL
)`);

// console.log(await db.execute(`SELECT * FROM shortener`));

export default db;
