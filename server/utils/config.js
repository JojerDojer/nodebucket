/**
 * Title: config.js
 * Author: John Davidson
 * Date: 1/22/2024
 * Description: Configuration file
 */

"use strict";

// Database configuration object
const db = {
  username: "nodebucket_user",
  password: "s3cret",
  name: "nodebucket"
};

// Configuration object for the application
const config = {
  port: 3000,
  dbUrl: `mongodb+srv://${db.username}:${db.password}@bellevueuniversity.feyswh3.mongodb.net/${db.name}?retryWrites=true&w=majority`,
  dbname: db.name
};

module.exports = config;