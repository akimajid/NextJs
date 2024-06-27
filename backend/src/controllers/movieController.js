const movieService = require("../services/movieService");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

class MovieController {
  async create(req, res) {
    try {
      const movie = req.body;
      if (req.file) {
        movie.imageUrl = req.file.path;
      }
      const newMovie = await movieService.createMovie(movie);
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const movies = await movieService.getAllMovies();
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findById(req, res) {
    try {
      const movie = await movieService.getMovieById(req.params.id);
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const movie = req.body;
      if (req.file) {
        movie.imageUrl = req.file.path;
      }
      const updatedMovie = await movieService.updateMovie(req.params.id, movie);
      if (!updatedMovie[0]) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.status(200).json({ message: "Movie updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await movieService.deleteMovie(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  uploadImage() {
    return upload.single("image");
  }
}

module.exports = new MovieController();
