const express = require("express");
const router = express.Router();
const { limitPerIp } = require("../middlewares/limiter");
const { generateAccessToken } = require("../middlewares/auth");

router.get("/light", limitPerIp(1), (req, res) => {
  res.send("Light public");
});

router.get("/heavy", limitPerIp(5), (req, res) => {
  res.send("Heavy public");
});

router.get("/tokenprovider", limitPerIp(10), (req, res) => {
  res.send(generateAccessToken());
});

module.exports = router;
