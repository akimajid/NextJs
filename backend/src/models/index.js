const sequelize = require("../config/database");
const Movie = require("./movie");
const User = require("./user");

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  Movie,
  User,
};
