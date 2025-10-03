# Prisma Guide

To use Prisma, you need to install it first. We can install Prisma by simply go through the below docs.
[Prisma Docs](https://www.prisma.io/docs/getting-started/setup-prisma)

---

**Step1:-** If we are using Prisma for MySQL with JavaScript than we run the below command. It will install the Prisma library in our project.

```bash
npm install prisma --save-dev
```

Now we can create a new Prisma project by running the below command. It will create a new Prisma project in our current directory.

```bash
npx prisma init
```

Now we have a new folder called `prisma` in our project. We can use it to create our database schema. We can also use it to create our database.

---

**Step2:-** Create a Model for our database.

```syntax
model tableName{
// Fields with options.
}
```

Example:-

```
model User {
    id Int @id @default(autoincrement())
    name String?
    email String @unique
    password String
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt @default(now())
}
```

**Common Prisma Model Options:**

| **Option / Attribute**       | **Use (Kis cheez ke liye use hota hai)**                                                                                        | **Example in Prisma Schema**           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `@id`                        | Kisi field ko **Primary Key** banane ke liye (unique identifier for each row).                                                  | `id Int @id @default(autoincrement())` |
| `@default(value)`            | Kisi field ka **default value** set karne ke liye (agar value na di jaye to ye use hoga).                                       | `status String @default("active")`     |
| `@unique`                    | Field ke andar ke values **unique** rahenge (duplicate allow nahi hoga).                                                        | `email String @unique`                 |
| `@updatedAt`                 | Jab record update hoga to ye field **auto update** ho jayega current timestamp ke sath. Mostly `DateTime` ke sath use hota hai. | `updatedAt DateTime @updatedAt`        |
| `@map("db_field_name")`      | Prisma model ke field ka naam database me alag rakhne ke liye (custom DB column name).                                          | `fullName String @map("full_name")`    |
| `@db.VarChar(100)`           | Database me field ka **specific datatype aur size** dene ke liye (DB-level control).                                            | `title String @db.VarChar(100)`        |
| `@relation()`                | Tables ke beech **relationship** define karne ke liye (1-1, 1-n, m-n).                                                          | `posts Post[] @relation("UserPosts")`  |
| `@default(autoincrement())`  | Auto increment number generate karne ke liye (mostly Primary Key).                                                              | `id Int @id @default(autoincrement())` |
| `@default(uuid())`           | Automatically **UUID** generate karne ke liye.                                                                                  | `id String @id @default(uuid())`       |
| `@ignore`                    | Prisma ko bolta hai ki is field ko ignore kare (DB me hoga par Prisma use nahi karega).                                         | `tempField String @ignore`             |
| `@@unique([field1, field2])` | **Composite Unique Constraint** lagane ke liye (2 ya zyada fields ka combination unique hoga).                                  | `@@unique([firstName, lastName])`      |
| `@@id([field1, field2])`     | **Composite Primary Key** banane ke liye (multiple fields milke primary key bante hain).                                        | `@@id([userId, postId])`               |
| `@@map("table_name")`        | Prisma model ka naam alag, par DB me table ka naam alag dene ke liye.                                                           | `@@map("users_table")`                 |

---

**Step3:-** After creating Model we migrate it.

- Now, run `npx prisma migrate dev` to create migration files & push it.

- We can pass --name flag with it to include name:

```bash
npx prisma migrate dev --name init
```

- In production, we can run `npx prisma migrate deploy` to run migration files.

- We can also include both of them in package.json scripts.

---

**Step4:-** If Prisma Client is not install after running the above coe. Than we have manually install it.

```bash
npm install @prisma/client
```

---

**Step5:-** Now we create an instance of Prisma Client.

```js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
```

---

**Step6:-** Now we have to generate Prisma Client.

Run the below command to generate Prisma Client after defining the schema.

```bash
npx prisma generate
```

`npx prisma generate` is automatically run when we run `npx prisma migrate dev`. It can also be run manually, if schema is updated outside of `npx prisma migrate dev`.

---

**Step7:-** Now we can use Prisma Client to create, read, update and delete data in our database.

**Syntax For All CRUD Operations:**

```js
const variableName = await prisma.modelName.methodName({
  where: {
    // Fields with options.
  }
  data: {
    // Fields with options.
  },
})
```

- **Insert Data:**

  1. Insert a single user data.

  ```js
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "R6e0o@example.com",
      password: "password",
    },
  });
  ```

  2. Insert multiple user data.

  ```js
  const users = await prisma.user.createMany({
    data: [
      {
        name: "John Doe",
        email: "R6e0o@example.com",
        password: "password",
      },
      {
        name: "John Doe",
        email: "R6e0o@example.com",
        password: "password",
      },
    ],
  });
  ```

---

- **Read Data:**

  1. Read all data.

  ```js
  const users = await prisma.user.findMany();
  console.log(users);
  ```

  2. Read single data. If we want it to run it on unique fields only.

  ```js
  const user = await prisma.user.findUnique({
    where: {
      email: "R6e0o@example.com",
    },
  });
  console.log(user);
  ```

  3. Read single data. Either it is unique or not.

  ```js
  const user = await prisma.user.findMany({
    where: {
      email: "R6e0o@example.com",
    },
  });
  console.log(user);
  ```

**Prisma Read Methods CheatSheet:**

| **Method**          | **Use (Kis cheez ke liye use hota hai)**                                                                                             | **Example**                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `findUnique`        | Ek single record ko fetch karta hai jo **unique field** (jaise `id`, `email`) se match kare. Agar nahi mila to `null` return karega. | `ts const user = await prisma.user.findUnique({ where: { id: 1 } }); `                                              |
| `findFirst`         | Pehla record fetch karega jo condition match kare. (useful jab multiple records ho but ek hi chahiye).                               | `ts const user = await prisma.user.findFirst({ where: { status: "active" } }); `                                    |
| `findMany`          | Multiple records fetch karta hai. Isme `where`, `orderBy`, `skip`, `take` use kar sakte ho.                                          | `ts const users = await prisma.user.findMany({ where: { status: "active" }, orderBy: { name: "asc" }, take: 5 }); ` |
| `findUniqueOrThrow` | `findUnique` jaisa hai but agar record na mila to **error throw karega** (null nahi dega).                                           | `ts const user = await prisma.user.findUniqueOrThrow({ where: { id: 1 } }); `                                       |
| `findFirstOrThrow`  | `findFirst` jaisa hai but record na mila to **error throw** karega.                                                                  | `ts const user = await prisma.user.findFirstOrThrow({ where: { email: "test@test.com" } }); `                       |
| `count`             | Total number of records count karta hai jo condition match karte hain.                                                               | `ts const total = await prisma.user.count({ where: { status: "active" } }); `                                       |
| `aggregate`         | Aggregate queries ke liye (jaise `count`, `avg`, `sum`, `min`, `max`).                                                               | `ts const stats = await prisma.user.aggregate({ _count: true, _avg: { age: true } }); `                             |
| `groupBy`           | Records ko group karke aggregation karne ke liye (SQL GROUP BY ke jaisa).                                                            | `ts const result = await prisma.user.groupBy({ by: ["status"], _count: { _all: true } }); `                         |

---

- **Update Data:**

  1. Update single data.

  ```js
  const user = await prisma.user.update({
    where: {
      id: 1,
    },
    data: {
      name: "John Doe",
      email: "R6e0o@example.com",
      password: "password",
    },
  });
  console.log(user);
  ```

  2. Update multiple data.

  ```js
  const users = await prisma.user.updateMany({
    where: {
      status: "active",
    },
    data: {
      status: "inactive",
    },
  });
  console.log(users);
  ```

**Note:** If we use update method than we can only use unique fields in where clause, to update data. & if we use updateMany method than we can use any field in where clause.

---

- **Delete Data:**

  1. Delete single data.

  ```js
  const user = await prisma.user.delete({
    where: {
      id: 1,
    },
  });
  console.log(user);
  ```

  2. Delete multiple data.

  ```js
  const users = await prisma.user.deleteMany({
    where: {
      status: "active",
    },
  });
  console.log(users);
  ```

**Note:** If we use delete method than we can only use unique fields in where clause, to delete data. & if we use deleteMany method than we can use any field in where clause.

---

When we want to delete, update Many data than we can use `deleteMany` and `updateMany` methods.

**Example1:-** Delete Using Multiple Fields, either unique field or non-unique field.

```js
const users = await prisma.user.deleteMany({
  where: {
    id: {
      in: [1, 2, 3],
    },
  },
});

console.log(`${deletedUsers.count} users deleted`);
```

**Example2:-** Suppose we have to delete multiple users by name or email than.

```js
const deletedUsers = await prisma.user.deleteMany({
  where: {
    OR: [
      { name: { in: ["Rahul", "Aman"] } }, // name "Rahul" ya "Aman"
      { email: { in: ["test1@email.com", "test2@email.com"] } }, // ya in emails wale users
    ],
  },
});

console.log(`${deletedUsers.count} users deleted`);
```
