"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const router_1 = __importDefault(require("./router"));
const http = require("http");
const socketIO = require("socket.io");
// import express = require('express')
// import path = require ('path')
const fs_1 = __importDefault(require("fs"));
const expressServer = server_1.default.init(4444);
const server = http.createServer(expressServer.app);
const io = socketIO.listen(server);
expressServer.app.use(router_1.default);
if (!fs_1.default.existsSync("serverFiles")) {
    fs_1.default.mkdirSync("serverFiles");
}
const idLog = [];
const arrayCheck = (num) => {
    idLog.map((el) => {
        if (el !== num) {
            idLog.push(num);
        }
    });
};
io.on('connection', (socket) => {
    // tslint:disable-next-line:no-console
    console.log('New Socket Connected');
    socket.on("join new room", (data) => {
        const { id, page, device } = data;
        arrayCheck(id);
        socket.join(id);
        io.in(id).emit('room joined', { message: 'Thanks for Connecting' });
        fs_1.default.appendFile(`serverFiles/client_${id}-${device}.txt`, page + "\n", (err) => {
            if (err)
                throw err;
        });
    });
    io.sockets.emit('client broadcast', idLog);
    socket.on("disconnect", (roomId) => {
        socket.leave(roomId);
    });
});
server.listen(4444, () => {
    // tslint:disable-next-line:no-console
    console.log('listening on 4444');
});
// import express, {Application} from 'express'
// const app: Application = express()
// import {Server, Socket} from 'socket.io'
// import fs from 'fs'
// const sendMessage = (socket: Socket | Server) => {
//     (message: Message) => socket.emit("message", message)
// }
// export default (io: Server) => {
//     const messages: Set <Message> = new Set()
//     io.on('connection', (socket)=> {
//         socket.on('getMessages', ()=> {
//             messages.forEach(sendMessage(socket))
//         })
//         socket.on('message', (value: string)=> {
//             const message: Message = {
//                 id: 1,
//                 message: 'hello',
//                 value,
//             }
//             messages.add(message)
//             sendMessage(io)(message)
//         })
//     })
// }
// const io = socket(app.listen(3550, () => (
//     // tslint:disable-next-line:no-console
//     console.log('Listening on port 3550')
//     )))
// if(!fs.existsSync("serverFiles")){
//     fs.mkdirSync("serverFiles")
// }
// io.on('connection', (newSocket: socket) => {
//   }
// )
//# sourceMappingURL=index.js.map