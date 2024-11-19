import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://kratos:NgqHxvYeVBXBQkhv@cluster0.0zngv.mongodb.net/"
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
