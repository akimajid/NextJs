const movieRepository = require("../repositories/movieRepository");

class MovieService {
  async createMovie(movie) {
    return await movieRepository.create(movie);
  }

  async getAllMovies() {
    return await movieRepository.findAll();
  }

  async getMovieById(id) {
    return await movieRepository.findById(id);
  }

  async updateMovie(id, movie) {
    return await movieRepository.update(id, movie);
  }

  async deleteMovie(id) {
    return await movieRepository.delete(id);
  }
}

module.exports = new MovieService();
