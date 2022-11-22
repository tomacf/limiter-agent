const redis = require("redis");
const client = redis.createClient();

client.on("error", function (err) {
  console.log("could not establish a connection with redis. " + err);
});

client.on("connect", function (err) {
  console.log("connected to redis successfully");
});

module.exports = client;
