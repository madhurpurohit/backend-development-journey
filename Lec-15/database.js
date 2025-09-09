const { MongoClient } = require("mongodb"); // MongoClient is an class.
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url =
  "mongodb+srv://madhurPurohit:Madhur7610@learnmongodb.mhkz6cu.mongodb.net/"; // Here we write our connection string which we get while creating a cluster.
const client = new MongoClient(url); // It will create an object/instance of class MongoClient(url).

// Database Name
const dbName = "LearnMongoDB"; // Here inside "" we write our database name like LearnMongoDB.

async function main() {
  // Use connect method to connect to the server
  await client.connect(); // This will help to connect backend to cluster.
  console.log("Connected successfully to server");

  const db = client.db(dbName); // This will not check that inside cluster is there anb db, that's why we don't write await.
  const collection = db.collection("user"); // This will not check that inside cluster is there anb db, that's why we don't write await. Here inside "" we will write our collection name like user.

  // The below code will get all the data. Here it will send a network call to connect & get it that's why we use await here.
  //todo when we try to find data or any other operation than the above db & collection will be checked that they are presented or not.
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  //* Insert only one document.
  const insertOne = await collection.insertOne({
    name: "Bobby",
    age: 29,
    country: "New Zealand",
  });
  console.log(`Inserted documents =>`, insertOne);

  //* Insert multiple document.
  const insertResult = await collection.insertMany([
    { name: "David", age: 55, country: "Australia" },
    { name: "Dwayne", age: 59, country: "England" },
    { name: "Harry", age: 29, country: "Russia" },
  ]);
  console.log("Inserted documents =>", insertResult);

  //* Query filter.
  const filteredDocs = await collection.find({ age: 29 }).toArray();
  console.log("Found documents filtered by { a: 3 } =>", filteredDocs);

  //* Delete one document.
  const deleteResult = await collection.deleteOne({ name: "Bobby" });
  console.log("Deleted documents =>", deleteResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close()); // This will always run at last either connection is establish or getting an error, because after work don we have to close the connection which it will do automatically.
