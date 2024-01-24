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
const Ajv = require('ajv');

const ajv = new Ajv();

const { ObjectId } = require('mongodb');

/**
 * @swagger
 * /api/employees/{empId}:
 *   get:
 *     summary: Get an employee by ID
 *     description: Retrieve employee details by providing their ID.
 *     parameters:
 *       - in: path
 *         name: empId
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response with the employee data.
 *       '400':
 *         description: Bad request, invalid employee ID.
 *       '404':
 *         description: Employee not found.
 *       '500':
 *         description: Internal server error.
 */

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


// Find all tasks API
// [::1]:3000/api/employees/1007/tasks -----> use in the get entry for thunder client
router.get('/:empId/tasks', (req, res, next) => {
  try {
    let {empId} = req.params;
    empId = parseInt(empId, 10); // Parse the empId to an integer.

    if (isNaN(empId)) {
      const err = new Error('input must be a number');
      err.status = 400;
      console.error('err', err);
      next(err);
      return
    }


    mongo(async db => {
      // Find employee by empId, projecting only necessary fields.
      const employee = await db.collection('employees').findOne(
        { empId },
        { projection: { empId: 1, todo: 1, done: 1}}
      )

      console.log('employee', employee);

      // If employee not found, handle 404 error.
      if (!employee) {
        const err = new Error('Unable to find employee for empId' + empId);
        err.status = 404;
        console.error('err', err);
        next(err);
        return;
      }

      // Send the employee data in the response.
      res.send(employee);

    }, next)

  } catch (err) {
    // Handle any unexpected errors by logging them and passing them to the next middleware.
    console.error('err', err);
    next(err);
  }
})

// ajv schema validation
const taskSchema = {
  type: 'object',
  properties: {
    text: { type: 'string'}
  },
  required: ['text'],
  additionalProperties: false
}



// Create task API
router.post('/:empId/tasks', (req, res, next) => {
  try {
    let { empId } = req.params // gets Id
    empId = parseInt(empId, 10);

    // empId validation
    if (isNaN(empId)) {
      const err = new Error('input must be a number');
      err.status = 400;
      console.error('err', err);
      next(err);
      return;
    }

    // req.body validation using Ajv.
    const { text } = req.body;
    const validator = ajv.compile(taskSchema);
    const isValid = validator({ text });

    // Checks if the task entry is valid.
    if (!isValid) {
      const err = new Error('Bad Request');
      err.status = 400;
      err.errors = validator.errors;
      console.error('err', err);
      next(err);
      return;
    }

    // Query database to find record.
    mongo(async db => {
      // Find the employee by empId.
      const employee = await db.collection('employees').findOne({ empId });

      // If employee doesn't exist, throw 404.
      if (!employee) {
        const err = new Error('Unable to find employee empId' + empId);
        err.status = 404;
        console.error('err', err);
        next(err);
        return;
      }

      // Create a new task with a unique ID.
      const task = {
        _id: new ObjectId(),
        text
      }

      // Update the employee's todo list with the new task.
      const result = await db.collection('employees').updateOne(
        { empId },
        { $push: { todo: task}}
      )

      // Check if the task creation was successful.
      if (!result.modifiedCount) {
        const err = new Error('Unable to create task for empId' + empId);
        err.status = 500;
        console.error('err', err);
        next(err);
        return;
      }

      // Send a success response with the task ID.
      res.status(201).send({ id: task._id })
    }, next)
  } catch (err) {
    // Handle any unexpected errors.
    console.error('err', err)
    next(err);
  }
})

// Export the router for use in other modules.
module.exports = router;