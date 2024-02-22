import cors from 'cors'
const WHITELISTE = ['http://localhost:8080', 'http://localhost:3001']

const corsOptions = {
  origin: function (origin, callback) {
    console.log('ORIGINS', origin)
    if (WHITELISTE.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS2'))
    // if (WHITELISTE.indexOf(origin) !== -1) {
    //   callback(null, true)
    // } else {
    //   callback(new Error('Not allowed by CORS'))
    // }
  }

}

export const middlewareCors = () => {
  return cors(corsOptions)
}
