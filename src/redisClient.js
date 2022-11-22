const redis = require("redis");
const client = redis.createClient({
  url: "redis://redis:6379",
});

client.on("error", function (err) {
  console.log("could not establish a connection with redis. " + err);
});

client.on("connect", function (err) {
  console.log("connected to redis successfully");
});

module.exports = client;
