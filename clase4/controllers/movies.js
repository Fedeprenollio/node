import { MovieModel } from '../models/movie.js'
import { validateMovie, validateParcialMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genres } = req.query
    const movies = await MovieModel.getAll({ genres })

    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  static create = async (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
      res.status(400).json({
        error: JSON.parse(result.error.message)
      })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    res.status(201).json(newMovie)
  }

  static update = async (req, res) => {
    const { id } = req.params
    const result = validateParcialMovie(req.body)

    if (result.error) {
      return res.status(400).json(JSON.parse(result.error.message))
    }

    const updateMovie = await MovieModel.update({ id, input: result.data })

    // res.status(404).json({ message: 'Movie not found' })

    return res.json(updateMovie)
  }

  static delete = async (req, res) => {
    const { id } = req.params

    const result = MovieModel.delete({ id })

    if (result === false) return res.status(404).json({ message: 'Movie not foudn' })

    return res.json({ message: 'Movie deleted succeful' })
  }
}
