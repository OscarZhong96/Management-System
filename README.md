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
# Resources
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
