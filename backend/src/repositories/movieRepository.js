const { Movie } = require("../models");

class MovieRepository {
  async create(movie) {
    return await Movie.create(movie);
  }

  async findAll() {
    return await Movie.findAll();
  }

  async findById(id) {
    return await Movie.findByPk(id);
  }

  async update(id, movie) {
    return await Movie.update(movie, { where: { id } });
  }

  async delete(id) {
    return await Movie.destroy({ where: { id } });
  }
}

module.exports = new MovieRepository();
