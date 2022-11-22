const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const client = require("./src/redisClient");
const router = require("./src/router");

async function main() {
  await client.connect();
  app.use(router);
  app.listen(port, () =>
    console.log(`Nice app listening at http://localhost:${port}`)
  );
}

main().catch((err) => console.log(err));
