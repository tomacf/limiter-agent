const client = require("../services/redisClient");

const tokenLimitHour = process.env.TOKEN_LIMIT_HOUR;
const ipLimitHour = process.env.IP_LIMIT_HOUR;

async function isOverLimit(id, currentLimit, weight) {
  // The two redis call are fired directly and not sequentialy
  const countPromise = client.incrBy(id, weight);
  const remainingTimePromise = client.ttl(id);

  let count = await countPromise;
  let remainingTime = await remainingTimePromise;

  if (count > currentLimit) {
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
      await isOverLimit(req.ip, ipLimitHour, weight);
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
      await isOverLimit(req.user, tokenLimitHour, weight);
      next();
    } catch (error) {
      res.status(429).send(error.message);
      return;
    }
  };
}

module.exports = { limitPerIp, limitPerToken };
