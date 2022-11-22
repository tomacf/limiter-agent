const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const client = require("./src/redisClient");
const router = require("./src/router");

async function main() {
  await client.connect();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());

  app.use(router);
  app.listen(port, () =>
    console.log(`Nice app listening at http://localhost:${port}`)
  );
}

main().catch((err) => console.log(err));
