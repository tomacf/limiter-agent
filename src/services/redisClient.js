const redis = require("redis");
const redis_host = process.env.REDIS_HOST;
const redis_port = process.env.REDIS_PORT;
const client = redis.createClient({
  url: `redis://${redis_host}:${redis_port}`,
});

client.on("error", function (err) {
  console.log(
    `Could not establish a connection with redis on host ${redis_host}:${redis_port}`,
    err
  );
});

client.on("connect", function (err) {
  console.log(
    `Connected to redis successfully on host ${redis_host}:${redis_port}`
  );
});

module.exports = client;
