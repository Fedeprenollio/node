import express from 'express'
import logger from 'morgan'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { createClient } from '@libsql/client'
import dotenv from 'dotenv'
dotenv.config()

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
})

await db.execute(
 `CREATE TABLE IF NOT EXISTS messages(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT,
  username TEXT,
  userId TEXT,
  avatar TEXT,
  time TEXT,
  color TEXT
)`
)

const PORT = process.env.PORT ?? 1234
const app = express()
const server = createServer(app)

app.use(logger('dev'))
const io = new Server(server, {
  connectionStateRecovery: {}
})

io.on('connection', async (socket) => {
  console.log('a user has connected!')

  socket.on('disconnect', () => {
    console.log('an user has disconnected')
  })

  socket.on('chat message', async ({ texto: msg, timeMsg }) => {
    let result
    const username = socket.handshake.auth.username ?? 'anonymus'
    const userId = socket.handshake.auth.userId
    const avatar = socket.handshake.auth.avatar
    const color = socket.handshake.auth.color
    console.log(color)
    try {
      result = await db.execute({
        sql: 'INSERT INTO messages (content, username, userId, time, avatar, color) VALUES (:messages , :username, :userId, :time, :avatar, :color)',
        args: { messages: msg, username, userId, time: timeMsg, avatar, color }
      })
    } catch (error) {
      console.error(error)
      return
    }

    io.emit('chat message', { texto: msg, rowId: result.lastInsertRowid.toString(), username, userId, timeMsg, avatar, color })
  })

  if (!socket.recovered) {
    try {
      const result = await db.execute({
        sql: 'SELECT * FROM messages WHERE id > ?',
        args: [socket.handshake.auth.serverOffset ?? 0]
      })
      result.rows.forEach(row => {
        socket.emit('chat message', { texto: row.content, rowId: row.id.toString(), username: row.username, userId: row.userId, timeMsg: row.time, avatar: row.avatar, color: row.color })
      })
    } catch (error) {
      console.error(error)
    }
  }
})

// io.on('connection', async (socket) => {
//   console.log('a user has connected!')

//   socket.on('disconnect', () => {
//     console.log('an user has disconnected')
//   })

//   socket.on('chat message', async (msg) => {
//     let result
//     // const username = socket.handshake.auth.username ?? 'anonymous'
//     // console.log({ username })
//     try {
//       result = await db.execute({
//         sql: 'INSERT INTO messages (content) VALUES (:msg)',
//         args: { msg }
//       })
//     } catch (e) {
//       console.error(e)
//       return
//     }

//     io.emit('chat message', msg, result.lastInsertRowid.toString())
//     console.log('QUE SOY?', result.lastInsertRowid.toString())
//   })

//   if (!socket.recovered) { // <- recuperase los mensajes sin conexión
//     try {
//       const results = await db.execute({
//         sql: 'SELECT id, content FROM messages WHERE id > ?',
//         args: [socket.handshake.auth.serverOffset ?? 0]
//       })

//       results.rows.forEach(row => {
//         socket.emit('chat message', row.content, row.id.toString())
//       })
//     } catch (e) {
//       console.error(e)
//     }
//   }
// })

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(PORT, () => {
  console.log(`Server is listenig on: http://localhost:${PORT}`)
})
