"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const websocket_1 = require("./websocket");
const server = http_1.default.createServer(app_1.default);
(0, websocket_1.setupWebSocket)(server);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
