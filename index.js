const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const client = require("./src/services/redisClient");
const router = require("./src/router");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);

async function main() {
  await client.connect();
  app.listen(port, () =>
    console.log(`Nice app listening at http://localhost:${port}`)
  );
}

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // This event is firs when worker died
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
}

// For Worker
else {
  main().catch((err) => console.log(err));
}
