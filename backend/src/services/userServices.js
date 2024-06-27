const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

class UserService {
  async register(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return await userRepository.create(user);
  }

  async login(username, password) {
    const user = await userRepository.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid username or password");
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );
    return { token };
  }
}

module.exports = new UserService();
