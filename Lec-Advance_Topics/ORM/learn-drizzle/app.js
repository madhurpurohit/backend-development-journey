import { name } from "ejs";
import { db } from "./config/db.js";
import { userTable } from "./drizzle/drizzle.js";
import { eq } from "drizzle-orm";

const main = async () => {
  //! Insert data.
  //* Insert Single Data.
  //   const insertUser = await db.insert(userTable).values({
  //     name: "DevFlux",
  //     email: "dev.flux@gmail.com",
  //     age: "25",
  //   });
  //   console.log(insertUser);

  //* Insert Multiple Data.
  //   const insertUsers = await db.insert(userTable).values([
  //     { name: "Madhur", email: "madhur@gmail.com", age: "24" },
  //     { name: "Sneha", email: "sneha@gmail.com", age: "22" },
  //     { name: "Alice", email: "alice@gmail.com", age: "28" },
  //     { name: "Bob", email: "bob@gmail.com", age: "30" },
  //     { name: "Charlie", email: "charlie@gmail.com", age: "43" },
  //     { name: "David", email: "david@gmail.com", age: "21" },
  //   ]);
  //   console.log(insertUsers);

  //! Read data.
  //* Read all data.
  //   const allUsers = await db.select().from(userTable);
  //   console.log(allUsers);

  //* Read specific data.
  //   const user = await db
  //     .select()
  //     .from(userTable)
  //     .where(eq(userTable.email, "sneha@gmail.com"));
  //   console.log(user);

  //! Update data
  //   const updatedUser = await db
  //     .update(userTable)
  //     .set({ name: "SnehaMadhur" })
  //     .where(eq(userTable.email, "sneha@gmail.com"));
  //   console.log(updatedUser);

  //! Delete data
  const deletedUser = await db
    .delete(userTable)
    .where(eq(userTable.email, "bob@gmail.com"));
  console.log(deletedUser);
};

main().catch((e) => {
  console.error(e);
});
