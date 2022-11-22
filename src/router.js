const express = require("express");
const router = express.Router();

const { limitePerIp, limitePerToken } = require("./limiter");

const { authenticateToken, generateAccessToken } = require("./auth");

router.get("/public", limitePerIp, (req, res) => {
  res.send("Free public");
});
router.get("/private", [authenticateToken, limitePerToken], (req, res) => {
  res.send("Birds home page");
});

router.get("/token_backdoor", (req, res) => {
  res.send(generateAccessToken({ username: "backdoor" }));
});

module.exports = router;
