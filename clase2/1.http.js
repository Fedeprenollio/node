const http = require('node:http')
const fs = require('node:fs')

const port = process.env.PORT ?? 3000

const precessRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200
    res.end('<h1>Bienvenidos a mi página!</h1')
  } else if (req.url === '/image') {
    fs.readFile('./cow.png', (err, data) => {
      if (err) {
        console.log('EL error es ', err)
        res.statusCode = 500
        res.end('<h1>Error en servidor</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404
    res.end('<h1>404</h1>')
  }
}

const server = http.createServer(precessRequest)

server.listen(port, () => {
  console.log(`server listening on server http://localhost:${port}`)
})
