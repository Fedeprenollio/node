// import { MovieModel } from '../models/movie.js'
// import { MovieModel } from '../models/database/mysql/movie.js'
import { validateMovie, validateParcialMovie } from '../schemas/movies.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })

    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
      res.status(400).json({
        error: JSON.parse(result.error.message)
      })
    }

    const newMovie = await this.movieModel.create({ input: result.data })

    res.status(201).json(newMovie)
  }

  update = async (req, res) => {
    const { id } = req.params
    const result = validateParcialMovie(req.body)

    if (result.error) {
      return res.status(400).json(JSON.parse(result.error.message))
    }

    const updateMovie = await this.movieModel.update({ id, input: result.data })

    // res.status(404).json({ message: 'Movie not found' })

    return res.json(updateMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = this.movieModel.delete({ id })

    if (result === false) return res.status(404).json({ message: 'Movie not foudn' })

    return res.json({ message: 'Movie deleted succeful' })
  }
}
