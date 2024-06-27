const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }
  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: "Failed to authenticate token" });
    }
    req.userId = decoded.id;
    next();
  });
};
