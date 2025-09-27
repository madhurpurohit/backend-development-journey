import { MongoClient } from "mongodb";
import { envSchema } from "../config/env.js";

const client = new MongoClient(envSchema.MONGO_URI);
await client.connect();

const db = client.db(envSchema.DATABASE_NAME);

const shortenerCollection = db.collection("shortener");

//* Get all data.
export const loadLinks = async () => {
  return await shortenerCollection.find().toArray();
};

//* Get a specific data, for shortCode.
export const checkShortCode = async (finalShortCode) => {
  return shortenerCollection.findOne({ shortCode: finalShortCode });
};

//* Insert data.
export const addShortenerLinks = async ({ shortCode, url }) => {
  return shortenerCollection.insertOne({ shortCode, url });
};
