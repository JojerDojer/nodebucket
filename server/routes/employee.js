/**
 * Title: employee.js
 * Author: John Davidson
 * Date: 1/18/2024
 * Description: Route handling
 */

"use strict"; // TEST API WITH THIS URL: [::1]:3000/api/employees/1007

// Import the Express framework and create a router.
const express = require("express");
const router= express.Router();

// Import the 'mongo' function from the '../utils/mongo' module.
const { mongo } = require("../utils/mongo")

// Define a route for handling GET requests to '/api/employees/:empId'.
router.get("/:empId", (req, res, next) => {
  try {
    // Extract the 'empId' parameter from the request parameters.
    let { empId } = req.params;
    // Parse the 'empId' as an integer (base 10).
    empId = parseInt(empId, 10);

    // Check if 'empId' is not a valid number.
    if (isNaN(empId)) {
      // If not a number, handle the error.
      const err = new Error("Employee ID must be a number.");
      err.status = 400;
      console.log("err", err);
      next(err);
      return; // exit out of the if statement
    }

    // Use the 'mongo' function to interact with the MongoDB database.
    mongo(async db => {
      // Find one document in the 'employees' collection by employee id number.
      const employee = await db.collection("employees").findOne({empId}); // findOne returns a single document.

      // If employee id is not found, handle error.
      if (!employee) {
        const err = new Error("employee not found.");
        err.status = 404;
        console.log("err", err);
        next(err);
        return; // exit out of the if statement
      }

      res.send(employee); // send the employee record as a JSON response object.
    })

  } catch (err) {
    // Handle any unexpected errors by logging them and passing them to the next middleware.
    console.error("Error: ", err);
    next(err);
  }
})

// Export the router for use in other modules.
module.exports = router;