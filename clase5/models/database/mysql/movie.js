// Get the client
import mysql from 'mysql2/promise'

// Create the connection to database
const connection = await mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '405285',
  database: 'moviedb'
})

export class MovieModel {
  static getAll = async ({ genres }) => {
    // A simple SELECT query
    try {
      const [results, fields] = await connection.query(
        ' SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
      )

      console.log(results) // results contains rows returned by server
      console.log(fields) // fields contains extra meta data about results, if available
      return results
    } catch (err) {
      console.log(err)
    }
  }

  static async getById ({ id }) {
    try {
      const [results] = await connection.query(
        'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);', [id]
      )
      if (results.length === 0) return null
      return results
    } catch (err) {
      console.log(err)
    }
  }

  static async create ({ input }) {
    const [uuidResult] = await connection.query('SELECT UUID() uuid')
    const [{ uuid }] = uuidResult
    // todo: crear la conexión de genre
    try {
      const { title, year, director, duration, poster, rate } = input
      await connection.query(
        'INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?), ?,?,?,?,?,?);',
        [uuid, title, year, director, duration, poster, rate]

      )

      const [newMovie] = await connection.query(
        'SELECT  title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);', [uuid]
      )
      return { message: 'Pelicula agregada', newMovie: newMovie[0] }
    } catch (e) {
      throw new Error('Error creatin movie')
      // Enviar el error a algun servicio interno pero NUNCA al usuario
    }
  }

  static async delete ({ id }) {

  }

  static async update ({ id, input }) {

  }
}
