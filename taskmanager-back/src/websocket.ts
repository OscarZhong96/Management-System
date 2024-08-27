import { WebSocketServer } from 'ws';

export const setupWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

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