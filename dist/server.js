"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class Server {
    constructor(port) {
        this.port = port;
        this.app = express();
    }
    start(callback) {
        this.app.listen(this.port, callback);
    }
    static init(port) {
        return new Server(port);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map