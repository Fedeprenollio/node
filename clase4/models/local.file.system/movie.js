import { readJson } from '../utils.js'
import { randomUUID } from 'node:crypto'

const moviesJson = readJson('./movie.json')

export class MovieModel {
  static getAll = async ({ genres }) => {
    if (genres) {
      const movieGenres = moviesJson.filter(movie => movie.genre.some(g => g.toLowerCase() === genres.toLowerCase()))
      return movieGenres
    }

    return moviesJson
  }

  static async getById ({ id }) {
    const movieId = moviesJson.find(movie => movie.id === id)
    if (movieId) return (movieId)
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    moviesJson.push(newMovie)
    return (moviesJson)
  }

  static async delete ({ id }) {
    const movieIndex = moviesJson.findIndex(movie => movie.id === id)
    if (movieIndex < 0) return false

    moviesJson.splice(movieIndex, 1)

    return true
  }

  static async update ({ id, input }) {
    const movieIndex = moviesJson.findIndex(movie => movie.id === id)

    if (movieIndex < 0) return false

    const updateMovie = {
      ...moviesJson[movieIndex],
      ...input
    }

    moviesJson[movieIndex] = updateMovie
    return updateMovie
  }
}
