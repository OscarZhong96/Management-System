"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWebSocket = void 0;
const ws_1 = require("ws");
const setupWebSocket = (server) => {
    const wss = new ws_1.WebSocketServer({ server });
    wss.on('connection', (ws) => {
        console.log('New WebSocket connection');
        ws.on('message', (message) => {
            console.log('Received:', message);
            // Handle WebSocket messages
        });
        ws.on('close', () => {
            console.log('WebSocket connection closed');
        });
    });
};
exports.setupWebSocket = setupWebSocket;
