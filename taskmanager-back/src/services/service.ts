import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { Task } from '../template/tasktemplate';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Add a new task to the DynamoDB table
export const addTask = async (task: Task): Promise<Task> => {
  // Ensure the key 'Id' is included
  if (!task.Id) {
    throw new Error('Task must have an Id');
  }

  const params = {
    TableName: 'Taskmanager-API',
    Item: task,
  };

  try {
    await docClient.send(new PutCommand(params));
    return task;
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
  const params = {
    TableName: 'Taskmanager-API',
    Key: { Id }, // Use Id as per the Task type
  };

  try {
    const data = await docClient.send(new GetCommand(params));
    return data.Item as Task || null;
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
  const params = {
    TableName: 'Taskmanager-API',
    Key: { Id }, // Use Id as per the Task type
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeNames: {
      '#status': 'status',
    },
    ExpressionAttributeValues: {
      ':status': status,
    },
    ReturnValues: 'ALL_NEW' as 'ALL_NEW', // Use string literals for ReturnValues
  };

  try {
    const data = await docClient.send(new UpdateCommand(params));
    return data.Attributes as Task || null;
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
  const params = {
    TableName: 'Taskmanager-API',
    Key: { Id }, // Use Id as per the Task type
  };

  try {
    await docClient.send(new DeleteCommand(params));
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Unable to delete task: ${error.message}`);
    } else {
      throw new Error('Unable to delete task: An unknown error occurred');
    }
  }
};