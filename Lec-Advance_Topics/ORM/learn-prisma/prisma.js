//* Import PrismaClient
import { PrismaClient } from "@prisma/client";

//* Create an instance of PrismaClient
const prisma = new PrismaClient();

//* Main function
const main = async () => {
  //! Insert Data;-
  //* Insert Single Data.
  //   const user = await prisma.user.create({
  //     data: {
  //       name: "DevFlux",
  //       email: "dev.flux@gmail.com",
  //     },
  //   });
  //   console.log(user);

  //* Insert Multiple Data.
  //   const users = await prisma.user.createMany({
  //     data: [
  //       { name: "Madhur", email: "madhur@gmail.com" },
  //       { name: "Sneha", email: "sneha@gmail.com" },
  // { name: "Alice", email: "alice@gmail.com" },
  //   { name: "Bob", email: "bob@gmail.com" },
  //   { name: "Charlie", email: "charlie@gmail.com" },
  //   { name: "David", email: "david@gmail.com" },
  //     ],
  //   });
  //   console.log(users);

  //! Read Data.
  //* Read all data.
  //   const users = await prisma.user.findMany();
  //   console.log(users);

  //* Read unique field data.
  //   const user = await prisma.user.findUnique({
  //     where: { id: 3 },
  //   });
  //   console.log(user);

  //* Read Either Unique or Multiple field data..
  //   const users = await prisma.user.findMany({
  //     where: { name: "Sneha" },
  //   });
  //   console.log(users);

  //! Update Data.
  //* Update Single Data. For this ewe use update method, & this method will only use unique fields.
  //   const updatedUser = await prisma.user.update({
  //     where: {
  //       id: 3,
  //     },
  //     data: {
  //       email: "sneha.madhur@gmail.com",
  //     },
  //   });
  //   console.log(updatedUser);

  //* Update Multiple Data.
  //   const updateUsers = await prisma.user.updateMany({
  //     where: {
  //       email: "bob@gmail.com",
  //     },
  //     data: {
  //       name: "BobTheBuilder",
  //     },
  //   });
  //   console.log(updateUsers);

  //! Delete Data.
  //* Delete Single Data. For this we use delete method, & this method will only use unique fields.
  //   const deletedUser = await prisma.user.delete({
  //     where: {
  //       id: 5,
  //     },
  //   });
  //   console.log(deletedUser);

  //* Delete Multiple Data. For this we use deleteMany method, & this method will only use unique fields.
  const deletedUsers = await prisma.user.deleteMany({
    where: { name: "Alice" },
  });
  console.log(deletedUsers);
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
