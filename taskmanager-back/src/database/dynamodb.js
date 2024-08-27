"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docClient = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
require("dotenv/config"); // Ensure environment variables are loaded
// Load environment variables
const region = process.env.AWS_REGION || 'us-west-2';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
console.log(`AWS Region: ${region}`);
console.log(`AWS Access Key ID: ${accessKeyId ? '********' : 'Not Set'}`);
console.log(`AWS Secret Access Key: ${secretAccessKey ? '********' : 'Not Set'}`);
// Create a DynamoDB client
const client = new client_dynamodb_1.DynamoDBClient({
    region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
});
// Create a Document Client
exports.docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
