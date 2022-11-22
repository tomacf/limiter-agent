const client = require("./redisClient");

const tokenLimitHour = process.env.TOKEN_LIMIT_HOUR;
const ipLimitHour = process.env.IP_LIMIT_HOUR;

async function isOverLimit(id, currentLimit) {
  let count;
  let remainingTime;
  count = await client.incr(id);
  if (count > currentLimit) {
    remainingTime = await client.ttl(id);
    throw {
      message: `${id}: You reached the request limit of ${count}/${currentLimit} for the remaining ${remainingTime} seconds. You will be able to send requests again at ${new Date(
        Date.now() + remainingTime
      ).toTimeString()}`,
    };
  }
  if (count === 1) {
    client.expire(id, 3600);
  }
}

async function limitePerIp(req, res, next) {
  try {
    await isOverLimit("ip_" + req.ip, ipLimitHour);
    next();
  } catch (error) {
    res.status(429).send(error.message);
    return;
  }
}

async function limitePerToken(req, res, next) {
  try {
    await isOverLimit(req.headers.authorization, tokenLimitHour);
    next();
  } catch (error) {
    res.status(429).send(error.message);
    return;
  }
}

module.exports = { limitePerIp, limitePerToken };
