/**
 * Title: app.js
 * Author: John Davidson
 * Date: 1/18/2024
 * Description:
 */
'use strict'

// Require statements
const express = require('express')
const createServer = require('http-errors')
const path = require('path')

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const employeeRoute = require("./routes/employee"); // Import employee.js file

// Create the Express app
const app = express()

// Configure the app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/nodebucket')))
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')))

// Define swagger options.
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Nodebucket APIs',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js']
};

// Initialize Swagger
const swaggerSpecification = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation using Swagger UI middleware.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecification));

app.use("/api/employees", employeeRoute); // Use the employee route.

// error handler for 404 errors
app.use(function(req, res, next) {
  next(createServer(404)) // forward to error handler
})

// error handler for all other errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500) // set response status code

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
})

module.exports = app // export the Express application



