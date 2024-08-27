"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTaskStatus = exports.getTask = exports.addTask = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
// Add a new task to the DynamoDB table
const addTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure the key 'Id' is included
    if (!task.Id) {
        throw new Error('Task must have an Id');
    }
    const params = {
        TableName: 'Taskmanager-API',
        Item: task,
    };
    try {
        yield docClient.send(new lib_dynamodb_1.PutCommand(params));
        return task;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Unable to add task: ${error.message}`);
        }
        else {
            throw new Error('Unable to add task: An unknown error occurred');
        }
    }
});
exports.addTask = addTask;
// Retrieve a task by its ID from the DynamoDB table
const getTask = (Id) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: 'Taskmanager-API',
        Key: { Id }, // Use Id as per the Task type
    };
    try {
        const data = yield docClient.send(new lib_dynamodb_1.GetCommand(params));
        return data.Item || null;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Unable to get task: ${error.message}`);
        }
        else {
            throw new Error('Unable to get task: An unknown error occurred');
        }
    }
});
exports.getTask = getTask;
// Update a task's status by its ID
const updateTaskStatus = (Id, status) => __awaiter(void 0, void 0, void 0, function* () {
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
        ReturnValues: 'ALL_NEW', // Use string literals for ReturnValues
    };
    try {
        const data = yield docClient.send(new lib_dynamodb_1.UpdateCommand(params));
        return data.Attributes || null;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Unable to update task status: ${error.message}`);
        }
        else {
            throw new Error('Unable to update task status: An unknown error occurred');
        }
    }
});
exports.updateTaskStatus = updateTaskStatus;
// Delete a task by its ID from the DynamoDB table
const deleteTask = (Id) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: 'Taskmanager-API',
        Key: { Id }, // Use Id as per the Task type
    };
    try {
        yield docClient.send(new lib_dynamodb_1.DeleteCommand(params));
        return true;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Unable to delete task: ${error.message}`);
        }
        else {
            throw new Error('Unable to delete task: An unknown error occurred');
        }
    }
});
exports.deleteTask = deleteTask;
