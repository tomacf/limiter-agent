const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function generateAccessToken() {
  const id = crypto.randomBytes(16).toString("hex");
  return jwt.sign(id, process.env.TOKEN_SECRET, {});
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken, generateAccessToken };
