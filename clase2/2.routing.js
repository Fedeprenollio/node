const http = require('node:http')

const dittoJson = require('./pokemon/ditto.json')

const processServer = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=uft-8')
          return res.end(JSON.stringify(dittoJson))

        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=uft-8')
          return res.end('<h1>404 not found</1>')
      }

    case 'POST':
      switch (url) {
        case '/pokemon':{
          let body = ''

          // escuchar los eventos de data
          req.on('data', (chunk) => {
            body += chunk.toString()
          })

          req.on('end', (q) => {
            const data = JSON.parse(body)
            res.writeHead(201, "Content-Type', 'application/json; charset=uft-8")
            data.time = Date.now()
            res.end(JSON.stringify(data))
          })
          break
        }
        case '/otro':{
          const body = ''
          break
        }

        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=uft-8')
          return res.end('<h1>404 not found</1>')
      }
  }
}

const server = http.createServer(processServer)

server.listen(3001, () => {
  console.log('Server listening on port http://localhost:3001')
})
