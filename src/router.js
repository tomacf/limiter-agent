const express = require("express");
const router = express.Router();

const publicRouter = require("./public/router");
const privateRouter = require("./private/router");

const {
  generateAccessToken,
  authenticateToken,
} = require("./middlewares/auth");

router.use("/public", publicRouter);
router.use("/private", authenticateToken, privateRouter);

module.exports = router;
