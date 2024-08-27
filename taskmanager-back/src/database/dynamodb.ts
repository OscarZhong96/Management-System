import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import 'dotenv/config'; // Ensure environment variables are loaded

// Load environment variables
const region = process.env.AWS_REGION || 'eu-north-1';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

console.log(`AWS Region: ${region}`);
console.log(`AWS Access Key ID: ${accessKeyId ? '********' : 'Not Set'}`);
console.log(`AWS Secret Access Key: ${secretAccessKey ? '********' : 'Not Set'}`);

// Create a DynamoDB client
const client = new DynamoDBClient({
  region,
  credentials: {
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!,
  },
});

// Create a Document Client
export const docClient = DynamoDBDocumentClient.from(client);