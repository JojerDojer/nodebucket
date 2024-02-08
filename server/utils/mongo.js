/**
 * Title: mongo.js
 * Author: John Davidson
 * Date: 1/18/2024
 * Description: MongoDB file
 */

"use strict"

// Import MongoClient from the mongodb package.
const { MongoClient } = require("mongodb");
const config = require('./config');

// Mongo connection string.
const MONGO_URL = config.dbUrl;

// Async function for handling Mongodb operations.
const mongo = async(operations, next) => {
  try {
    console.log("connecting to db...");
    // Connect to the MongoDB server using connection string.
    const client = await MongoClient.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Access the nodebucket database within the mongoDB server.
    const db = client.db(config.dbname);
    console.log("Connected to db.");

    // Execute the provided operations on the connected database.
    await operations(db);
    console.log("Operation was successful.");

    // Close the connection to the MongoDB server.
    client.close();
    console.log("Connect to db closed.");
    // Handle errors that may occur.
  } catch (err) {
    const error = new Error("Error connecting to db: ", err)
    error.status = 500;

    console.log("Error connecting to db: ", err);
    next(error);
  }
};

// Export the mongo fucntion for use in other modules.
module.exports = { mongo };
