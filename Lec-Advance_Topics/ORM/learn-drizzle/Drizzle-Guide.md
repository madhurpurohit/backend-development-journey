# Drizzle Guide

- [Drizzle ORM](https://orm.drizzle.team/)

## Steps to install Drizzle ORM & Perform CRUD operations.

**Step1:-** How to install Drizzle ORM & MySQL?

```bash
npm install drizzle-orm mysql2
```

Install Drizzle Kit:

```bash
npm install -D drizzle-kit
```

---

**Step2:-** Create a Database using Workbench?

```bash
CREATE DATABASE database_name;
```

---

**Step3:-** How to connect with MySQL Server?

For this firstly we have to make an .env file & than wrote the below line.

```bash
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
```

---

**Step4:-** How to connect Drizzle ORM to database?

```js
import { drizzle } from "drizzle-orm/mysql2";
const db = drizzle(process.env.DATABASE_URL);
```

---

**Step5:-** Hot to create a Table or Schema?

```js
import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users_table", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  age: int().notNull(),
});
```

In this our table name is "users_table".

---

**Step6:-** How to make a config file for Drizzle?

For this, firstly we have to create drizzle.config.js file.

```js
import {defineConfig} from "drizzle-kit";

export const defineConfig({
    out: "./drizzle",
    schema: "./drizzle/drizzle.js",
    dialect: "mysql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});
```

In this file we define the migration process via drizzle-kit.
Here out means where we want migrated files to go. & schema means where we have our schema file. & dialect means what type of database we are using. & dbCredentials means our database credentials.

---

**Step7:-** How to generate MySQLcode corresponding to Drizzle ORM?

```bash
npx drizzle-kit generate
```

**Step8:-** How to migrate MySQLcode to database?

```bash
npx drizzle-kit migrate
```

---

**Step9:-** How to create a Drizzle Studio?

```bash
npx drizzle-kit studio
```

**Step10:-** How to perform CRUD operations?

**Common code:-**

```js
import { db } from "./path";
import { suerTable } from "./path";

const main = async () => {
  // Write CRUD Operations
};

main().catch((err) => {
  console.log(err);
});
```

- **Insert:-**

  1. Insert a single data.

  ```js
  const insertUser = await db.insert(userTable).values({
    name: "DebFlux",
    email: "dev.flux@gmail.com",
    age: "25",
  });
  ```

  2. Insert multiple data.

  ```js
  const insertUsers = await db.insert(userTable).values([
    { name: "Madhur", email: "madhur@gmail.com", age: "24" },
    { name: "Sneha", email: "sneha@gmail.com", age: "22" },
    { name: "Alice", email: "alice@gmail.com", age: "28" },
    { name: "Bob", email: "bob@gmail.com", age: "30" },
    { name: "Charlie", email: "charlie@gmail.com", age: "43" },
    { name: "David", email: "david@gmail.com", age: "21" },
  ]);
  ```

- **Read:-**

  1. Read all data.

  ```js
  const users = await db.select().from(userTable);
  console.log(users);
  ```

  2. Read single data.

  ```js
  import { eq } from "drizzle-orm";

  const user = await db.select().from(userTable).where(eq(userTable.id, 1));
  console.log(user);
  ```

- **Update:-**

  1. Update single data.

  ```js
  import { eq } from "drizzle-orm";

  const user = await db
    .update(userTable)
    .set({
      name: "DevFlux",
    })
    .where(eq(userTable.id, 1));
  console.log(user);
  ```

  2. Update multiple data.

  ```js
  import { eq } from "drizzle-orm";

  const users = await db
    .update(userTable)
    .set({
      name: "DevFlux",
    }).
    .where(eq(userTable.status, "active"));
  console.log(users);
  ```

- **Delete:-**

  1. Delete single data.

  ```js
  import { eq } from "drizzle-orm";

  const user = await db.delete(userTable).where(eq(userTable.id, 1));
  console.log(user);
  ```

  2. Delete multiple data.

  ```js
  import { eq } from "drizzle-orm";

  const users = await db
    .delete(userTable)
    .where(eq(userTable.status, "active"));
  console.log(users);
  ```

---

## How to get some specific column data?

**Syntax:**

```js
.select({key: table.columnName}).from(table);
```

**Example:**

```js
const users = await db
  .select({
    name: userTable.name,
    email: userTable.email,
  })
  .from(userTable);
console.log(users);
```

---
