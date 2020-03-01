import Server from './server'
import router from './router'

import http = require('http')
import socketIO = require('socket.io')
// import express = require('express')
// import path = require ('path')
import fs from 'fs'

export interface Message {
    type: string
    payload: any
    id: any
    page: number
    device: number
}

const expressServer = Server.init(4444)
const server = http.createServer(expressServer.app)
const io = socketIO.listen(server)

expressServer.app.use(router)

if (!fs.existsSync("serverFiles")) {
    fs.mkdirSync("serverFiles");
  }

const idLog: any = []
const arrayCheck = (num: any) => {
    idLog.map((el:any) => {
        if(el !== num ){
            idLog.push(num)
        }
    })
}
io.on('connection', (socket: SocketIO.Socket) => {
    // tslint:disable-next-line:no-console
    console.log('New Socket Connected')
    socket.on("join new room", (data: Message) => {
        const {id, page, device} = data
        arrayCheck(id)
        socket.join(id)
        io.in(id).emit('room joined', {message: 'Thanks for Connecting'})
        fs.appendFile(`serverFiles/client_${id}-${device}.txt`, page + "\n", (err:any) => {
            if (err) throw err
        })

    })
    io.sockets.emit('client broadcast', idLog)
    socket.on("disconnect", (roomId: any) => {
        socket.leave(roomId)
    })
})

server.listen(4444, () => {
    // tslint:disable-next-line:no-console
    console.log('listening on 4444')
})







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
