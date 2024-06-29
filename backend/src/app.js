const express = require("express");
const sequelize = require("./config/database");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors")

const app = express();

app.use(cors())

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/movies", movieRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = app;
