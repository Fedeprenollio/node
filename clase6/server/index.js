import express from 'express'
import logger from 'morgan'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const PORT = process.env.PORT ?? 1234
const app = express()
const server = createServer(app)
app.use(logger('dev'))
const io = new Server(server, {
  connectionStateRecovery: {}
})

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

io.on('connection', (socket) => {
  console.log('a user has connected!')
  socket.on('disconnect', () => {
    console.log('an user has disconnected')
  })
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

server.listen(PORT, () => {
  console.log(`Server is listenig on: http://localhost:${PORT}`)
})
