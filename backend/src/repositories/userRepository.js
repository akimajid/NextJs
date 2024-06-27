const { User } = require("../models");

class UserRepository {
  async create(user) {
    return await User.create(user);
  }

  async findByUsername(username) {
    return await User.findOne({ where: { username } });
  }
}

module.exports = new UserRepository();
