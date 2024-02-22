const express = require('express')
const app = express()
const dittoJson = require('./pokemon/ditto.json')
const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by')

// EN lugar de ese middleware que inventamos, usamos
// directamente  una fincionalidad de express:
app.use(express.json())
// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()
//   let body = ''

//   // escuchar los eventos de data
//   req.on('data', (chunk) => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()

//     // mutar la reques y meter la info en la req
//     req.body = data
//     next()
//   })
// })

app.get('/pokemon/ditto', (req, res) => {
  res.status(200).json(dittoJson)
})

app.post('/pokemon', (req, res) => {
  res.status(201).send(req.body)
})

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on : http://localhost:${PORT}`)
})
