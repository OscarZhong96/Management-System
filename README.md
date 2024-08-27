# Management-System
Real-time Task Management System with both back-end and front-end components. The system will allow users to manage tasks concurrently in real-time, utilising WebSocket for instant updates and AWS DynamoDB for data persistence.

Task-

Back-End
Technology Stack: Node.js, Express, TypeScript, AWS SDK, AWS DynamoDB,
WebSocket
1. Create a RESTful API to manage your tasks
2. Data should be stored in AWS DynamoDB
3. Implement Real-Time updates with WebSocket
4. Use Typescript throughout the backend for type safety

Front-End
Technology Stack: React, Typescript
1. Create a react component for task management
2. Implement Realtime updates with WebSocket
3. Allow users to add new tasks and update task statuses
4. use Typescript for type safety

Daily LOG:

21/08/2024 18:02 pm
So firstly I am going to quickly do a refresher on Restful API and quickly learn the basics of TypeScript using https://www.w3schools.com/typescript/index.php and some relevant youtube videos which I shall add later.

# 21/08/2024

# Resources
https://www.typescriptlang.org/docs/handbook/intro.html - Typescript website with documentation and basics

https://www.w3schools.com/typescript/index.php - some practice questions

https://www.youtube.com/watch?v=WXsD0ZgxjRw&t=9s - APIs for Beginners 2023 - How to use an API (Full Course / Tutorial) by freeCodeCamp (refresher)

https://www.youtube.com/watch?v=-MTSQjw5DrM -  RESTful APIs in 100 Seconds // Build an API from Scratch with Node.js Express by fireship 

# 24/08/2024 19:49pm 
## Resources
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-examples.html - AWS documentation for dynamo db
https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/#basic-setup - setting up API and best practices

# File Structure
Ive started on the project using VS
created Real-time Task Management System API folder
then using the Terminal started creating the file structure

**mkdir creates a folder called taskmanager-back and cd navigates you to that folder**
mkdir taskmanager-back
cd taskmanager-back

**makes a folder called src and cd navigates into src folder**
mkdir src
cd src

**makes multiple subfolder in src using mkdir**
mkdir controllers && mkdir services && mkdir database && mkdir routes

**Creating a index file which will be the entry point to the API**
index.ts

**creating a websocket file for real time updates**
websocket.ts

**So we need to move out of src folder and back into taskmanager-back**
cd ..

**Creating package.Json file**
npm init -y

# 25/08/2024 17:10pm 
So now that i have the basic file structure setup I will start to look at installing the dependencies
### Typescript and Node.Js
So using the Typescript documentation website https://www.typescriptlang.org/download/ and follow the documentation from node.Js website https://nodejs.org/en/learn/getting-started/nodejs-with-typescript

we can install Typescript using:
npm install typescript

### Express
https://expressjs.com/en/starter/installing.html

We can install express using:
npm install express

### AWS SDK Dynamodb




### Summary of dependencies
Dependencies- install with npm in terminal
These are libraries and packages that the task manager backend project needs to run in production. 

@aws-sdk/client-dynamodb: This is the AWS SDK client for DynamoDB, used to interact with the DynamoDB service.
@aws-sdk/lib-dynamodb: This library provides higher-level abstractions for working with DynamoDB, including document client functionality.
@types/express: TypeScript type definitions for the Express framework, which helps with type safety and autocompletion in TypeScript.
@types/node: TypeScript type definitions for Node.js, which are necessary for writing TypeScript code that interacts with Node.js features.
@types/ws: TypeScript type definitions for the ws library, which is used for WebSocket connections.
dotenv: A module for loading environment variables from a .env file into process.env.
express: A popular web application framework for Node.js, used to build RESTful APIs.
ws: A WebSocket library for Node.js, used for handling WebSocket connections.
DevDependencies
These are packages that are only needed during development and testing. They are not required in the production environment.

@types/react: TypeScript type definitions for React, necessary for developing React applications with TypeScript.
@types/react-dom: TypeScript type definitions for React DOM, used to integrate React with the DOM.
ts-node-dev: A development tool for running TypeScript code with ts-node and provides features like hot-reloading and better error reporting.
typescript: The TypeScript compiler itself, which converts TypeScript code into JavaScript.
Scripts
These are commands you can run using npm or yarn. They automate common tasks related to development and deployment.

start: Runs the Server.ts file using ts-node-dev, which is typically used to start the server in production or when you're ready to deploy.
build: Executes the TypeScript compiler (tsc) to transpile TypeScript code into JavaScript. This is usually done before deployment.
dev: Runs the Server.ts file in development mode using ts-node-dev, which is helpful during development for features like hot-reloading.
test: A placeholder script for running tests. Currently, it only prints an error message indicating that no tests are specified.

## controller.ts
import { Request, Response } from 'express';
import * as taskService from '../services/service';

// Controller function to handle creating a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    // Call the addTask function from the service layer, passing the request body
    const task = await taskService.addTask(req.body);
    // Respond with status 201 (Created) and return the created task as JSON
    res.status(201).json(task);
  } catch (error) {
    // Handle any errors that occur during task creation
    if (error instanceof Error) {
      // Respond with status 500 (Internal Server Error) and the error message
      res.status(500).json({ error: error.message });
    } else {
      // Respond with a generic error message if the error is not an instance of Error
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Controller function to handle fetching a task by its ID
export const getTask = async (req: Request, res: Response) => {
  try {
    // Call the getTask function from the service layer, passing the task ID from the URL parameters
    const task = await taskService.getTask(req.params.id);
    if (task) {
      // Respond with status 200 (OK) and return the task as JSON
      res.status(200).json(task);
    } else {
      // Respond with status 404 (Not Found) if the task does not exist
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    // Handle any errors that occur during task retrieval
    if (error instanceof Error) {
      // Respond with status 500 (Internal Server Error) and the error message
      res.status(500).json({ error: error.message });
    } else {
      // Respond with a generic error message if the error is not an instance of Error
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Controller function to handle updating the status of a task by its ID
export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    // Call the updateTaskStatus function from the service layer, passing the task ID and the new status from the request body
    const task = await taskService.updateTaskStatus(req.params.id, req.body.status);
    if (task) {
      // Respond with status 200 (OK) and return the updated task as JSON
      res.status(200).json(task);
    } else {
      // Respond with status 404 (Not Found) if the task does not exist
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    // Handle any errors that occur during status update
    if (error instanceof Error) {
      // Respond with status 500 (Internal Server Error) and the error message
      res.status(500).json({ error: error.message });
    } else {
      // Respond with a generic error message if the error is not an instance of Error
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Controller function to handle deleting a task by its ID
export const deleteTask = async (req: Request, res: Response) => {
  try {
    // Call the deleteTask function from the service layer, passing the task ID from the URL parameters
    const success = await taskService.deleteTask(req.params.id);
    if (success) {
      // Respond with status 200 (OK) and a message indicating the task was deleted
      res.status(200).json({ message: 'Task deleted' });
    } else {
      // Respond with status 404 (Not Found) if the task does not exist
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    // Handle any errors that occur during task deletion
    if (error instanceof Error) {
      // Respond with status 500 (Internal Server Error) and the error message
      res.status(500).json({ error: error.message });
    } else {
      // Respond with a generic error message if the error is not an instance of Error
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

## dynamodb

// Import required modules from AWS SDK
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'; // Import the DynamoDBClient for direct DynamoDB operations
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'; // Import DynamoDBDocumentClient for easier JSON document operations
import 'dotenv/config'; // Import dotenv to load environment variables from a .env file

// Load environment variables from .env file or system environment
const region = process.env.AWS_REGION || 'eu-north-1'; // Default region if not specified in environment variables
const accessKeyId = process.env.AWS_ACCESS_KEY_ID; // Access Key ID for AWS
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY; // Secret Access Key for AWS

// Logging AWS configuration for debugging purposes
console.log(`AWS Region: ${region}`); // Print the AWS region
console.log(`AWS Access Key ID: ${accessKeyId ? '********' : 'Not Set'}`); // Print the Access Key ID, obfuscate the actual value for security
console.log(`AWS Secret Access Key: ${secretAccessKey ? '********' : 'Not Set'}`); // Print the Secret Access Key, obfuscate the actual value for security

// Create a new DynamoDB client instance with the specified configuration
const client = new DynamoDBClient({
  region, // Set the AWS region
  credentials: {
    accessKeyId: accessKeyId!, // Use non-null assertion operator as accessKeyId should be provided
    secretAccessKey: secretAccessKey!, // Use non-null assertion operator as secretAccessKey should be provided
  },
});

// Create a Document Client for easier interaction with DynamoDB JSON documents
export const docClient = DynamoDBDocumentClient.from(client); // Export the Document Client for use in other parts of the application

## Routes
// Import the Router class from express and all functions from the taskController
import { Router } from 'express';
import * as taskController from '../controllers/Controller';

// Create an instance of Router
const router = Router();

// Route to create a new task
// This endpoint handles POST requests to /tasks
// It uses the createTask method from the taskController to process the request
router.post('/tasks', taskController.createTask);

// Route to get a specific task by ID
// This endpoint handles GET requests to /tasks/:id
// The :id is a route parameter that represents the unique ID of the task
// It uses the getTask method from the taskController to retrieve the task
router.get('/tasks/:id', taskController.getTask);

// Route to update the status of a specific task by ID
// This endpoint handles PUT requests to /tasks/:id/status
// The :id is a route parameter representing the unique ID of the task
// It expects a new status to be provided in the request body
// It uses the updateTaskStatus method from the taskController to update the task's status
router.put('/tasks/:id/status', taskController.updateTaskStatus);

// Route to delete a specific task by ID
// This endpoint handles DELETE requests to /tasks/:id
// The :id is a route parameter representing the unique ID of the task to be deleted
// It uses the deleteTask method from the taskController to delete the task
router.delete('/tasks/:id', taskController.deleteTask);

// Check if you have /api/test route defined here
// This is a test route that handles POST requests to /test
// It simply responds with a message indicating that the route works
router.post('/test', (req, res) => {
    res.send('Test route works!');
  });

// Export the router so it can be used in other parts of the application
export default router;

## Service
// Import necessary classes from AWS SDK for DynamoDB
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { Task } from '../template/tasktemplate';

// Create a DynamoDB client instance with default settings
const client = new DynamoDBClient({});

// Create a Document Client from the DynamoDB client
// The Document Client provides a higher-level API for working with DynamoDB documents
const docClient = DynamoDBDocumentClient.from(client);

// Add a new task to the DynamoDB table
export const addTask = async (task: Task): Promise<Task> => {
  // Ensure the task has an 'Id' before proceeding
  if (!task.Id) {
    throw new Error('Task must have an Id');
  }

  // Define parameters for the PutCommand
  const params = {
    TableName: 'Taskmanager-API', // Name of the DynamoDB table
    Item: task, // The item (task) to be added
  };

  try {
    // Send the PutCommand to add the task to the table
    await docClient.send(new PutCommand(params));
    return task; // Return the added task
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to add task: ${error.message}`);
    } else {
      throw new Error('Unable to add task: An unknown error occurred');
    }
  }
};

// Retrieve a task by its ID from the DynamoDB table
export const getTask = async (Id: string): Promise<Task | null> => {
  // Define parameters for the GetCommand
  const params = {
    TableName: 'Taskmanager-API', // Name of the DynamoDB table
    Key: { Id }, // Key to identify the item to be retrieved
  };

  try {
    // Send the GetCommand to retrieve the task from the table
    const data = await docClient.send(new GetCommand(params));
    return data.Item as Task || null; // Return the retrieved task or null if not found
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to get task: ${error.message}`);
    } else {
      throw new Error('Unable to get task: An unknown error occurred');
    }
  }
};

// Update a task's status by its ID
export const updateTaskStatus = async (Id: string, status: string): Promise<Task | null> => {
  // Define parameters for the UpdateCommand
  const params = {
    TableName: 'Taskmanager-API', // Name of the DynamoDB table
    Key: { Id }, // Key to identify the item to be updated
    UpdateExpression: 'set #status = :status', // Expression to update the status attribute
    ExpressionAttributeNames: {
      '#status': 'status', // Mapping of attribute name to avoid conflicts with reserved words
    },
    ExpressionAttributeValues: {
      ':status': status, // New status value to be set
    },
    ReturnValues: 'ALL_NEW' as 'ALL_NEW', // Return all the attributes after the update
  };

  try {
    // Send the UpdateCommand to update the task status
    const data = await docClient.send(new UpdateCommand(params));
    return data.Attributes as Task || null; // Return the updated task or null if not found
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to update task status: ${error.message}`);
    } else {
      throw new Error('Unable to update task status: An unknown error occurred');
    }
  }
};

// Delete a task by its ID from the DynamoDB table
export const deleteTask = async (Id: string): Promise<boolean> => {
  // Define parameters for the DeleteCommand
  const params = {
    TableName: 'Taskmanager-API', // Name of the DynamoDB table
    Key: { Id }, // Key to identify the item to be deleted
  };

  try {
    // Send the DeleteCommand to remove the task from the table
    await docClient.send(new DeleteCommand(params));
    return true; // Return true to indicate the task was successfully deleted
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to delete task: ${error.message}`);
    } else {
      throw new Error('Unable to delete task: An unknown error occurred');
    }
  }
};
