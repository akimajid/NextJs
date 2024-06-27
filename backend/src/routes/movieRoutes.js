const express = require("express");
const movieController = require("../controllers/movieController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  movieController.uploadImage(),
  movieController.create
);
router.get("/", movieController.findAll);
router.get("/:id", movieController.findById);
router.put(
  "/:id",
  authMiddleware,
  movieController.uploadImage(),
  movieController.update
);
router.delete("/:id", authMiddleware, movieController.delete);

module.exports = router;
