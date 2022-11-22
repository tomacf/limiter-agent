const express = require("express");
const router = express.Router();
const { limitPerToken } = require("../middlewares/limiter");

router.get("/birds", limitPerToken(1), (req, res) => {
  res.send("Birds home page");
});
router.get("/dogs", limitPerToken(2), (req, res) => {
  res.send("Dogs home page");
});
router.get("/cows", limitPerToken(3), (req, res) => {
  res.send("Cows home page");
});
router.get("/bigmouses", limitPerToken(4), (req, res) => {
  res.send("Really big mouses home page");
});
router.get("/elephants", limitPerToken(5), (req, res) => {
  res.send("Elephants home page");
});

module.exports = router;
