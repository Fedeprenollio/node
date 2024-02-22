import express, { json } from 'express'

// import moviesJson from './movie.json' with { type:"json"}
/// -----///
import { createMovieRouter } from './routes/movies.js'
import { middlewareCors } from './middleware/cors.js'
// Usar un file json en ESModules:
// import fs from 'node:fs'
// const moviesJson = JSON.parse(fs.readFileSync('./movie.json', 'utf-8'))
// -----//
// USar el file json en ESModule de forma recomendada por ahora:
// LO hacemos en una funcion utils.js
// import { createRequire } from 'node:module'
// const require = createRequire(import.meta.url)
const PORT = process.env.PORT ?? 3001
const app = express()

export const createApp = ({ movieModel }) => {
  app.use(middlewareCors())

  app.disable('x-powered-by')
  app.use(json())

  app.use('/movies', createMovieRouter({ movieModel }))

  app.listen(PORT, () => {
    console.log(`Sever listenig on port http://localhost:${PORT}`)
  })
}
// métodos normales: GET/HEAD/POST
// métodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight
// OPTIONS

// solo si no uso cors()
// app.options('/movies/:id', (req, res, next) => {
//   const origin = req.header('origin')
//   if (WHITELISTE.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'GET, POST,PUT;PATCH')
//   }
// res.send(200)
// })
