import { MongoClient } from "mongodb"; // This is the MongoDB driver for Node.js, which allows you to connect to a MongoDB database and perform operations on it.

const client = new MongoClient("mongodb://127.0.0.1"); // Here we write our connection string which we get while creating a cluster. If we want to connect with our localhost then we write 127.0.0.1.

//* How to connect this client to MongoDB. It will return a promise.
await client.connect();

//* How to create a database.
const db = client.db("mongodb_nodejs"); // Here inside "" we write our database name like mongodb_nodejs.

//* How to create a collection.
const userCollection = db.collection("users"); // Here inside "" we write our collection name like users.

//* How to insert a document.
// userCollection.insertOne({ name: "DevFlux", age: 25, city: "India" });

//* How to insert many documents.
// userCollection.insertMany([
//   { name: "DevFlux", age: 25, city: "India" },
//   { name: "Madhur", age: 27, city: "India" },
//   { name: "Madhur Purohit", age: 25, city: "India" },
//   { name: "David", age: 30, city: "India" },
// ]);

//* How to find a document.
// const result = userCollection.find();

// for await (let user of result) {
//   console.log(user);
// }

//* How to find a specific document.
// const resultOne = await userCollection.findOne({ name: "DevFlux" });
// console.log(resultOne);

//* How to update a document.
// const updateResult = await userCollection.updateOne(
//   { name: "David" },
//   { $set: { city: "England" } }
// );

// console.log(updateResult);

//* How to delete a document.
// const deleteResult = await userCollection.deleteOne({ name: "DevFlux" });
// console.log(deleteResult.deletedCount); // It will return the number of documents deleted.
