import { MongoClient } from "mongodb";
import { key } from "./pass.js";

const client = new MongoClient(
  `mongodb+srv://kratos:${key}@cluster0.0zngv.mongodb.net/`
);

export const dbConnection = async () => {
  try {
    await client.connect();
    const database = client.db("trivIAgame");
    const collection = database.collection("questions");

    const result = await collection.find().toArray();

    await client.close();

    return result;
  } catch (error) {
    return error;
  }
};
