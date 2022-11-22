const client = require("../services/redisClient");

const tokenLimitHour = process.env.TOKEN_LIMIT_HOUR;
const ipLimitHour = process.env.IP_LIMIT_HOUR;

async function isOverLimit(id, currentLimit, weight) {
  let count;
  let remainingTime;
  count = await client.incrBy(id, weight);
  if (count > currentLimit) {
    remainingTime = await client.ttl(id);
    throw {
      message: `You reached the request limit of ${count}/${currentLimit} for the remaining ${remainingTime} seconds. You will be able to send requests again at ${new Date(
        Date.now() + remainingTime * 1000
      ).toTimeString()}`,
    };
  }
  if (count === weight) {
    client.expire(id, 3600);
  }
}

function limitPerIp(weight) {
  return async (req, res, next) => {
    try {
      await isOverLimit("ip_" + req.ip, ipLimitHour, weight);
      next();
    } catch (error) {
      res.status(429).send(error.message);
      return;
    }
  };
}

function limitPerToken(weight) {
  return async (req, res, next) => {
    try {
      await isOverLimit(req.headers.authorization, tokenLimitHour, weight);
      next();
    } catch (error) {
      res.status(429).send(error.message);
      return;
    }
  };
}

module.exports = { limitPerIp, limitPerToken };
