const redisClient = require("../config/redis");
const crypto = require("crypto");

const windowSize = 10; // Expire time TTL (Total Time to Leave).
const maxRequests = 10;

const rateLimiter = async (req, res, next) => {
  try {
    const key = `req.ip`;
    const currentTime = Date.now() / 1000; // To calculate current time in seconds when request hits.
    const windowTime = currentTime - windowSize; // Previous 1 hour always.

    //* To delete the data/request or value inside the sorted set which is not inside window size (previous 1 Hour).
    await redisClient.zRemRangeByScore(key, 0, windowTime);

    //* To know the total number of data/request or values inside sorted set.
    const numberOfRequest = await redisClient.zCard(key);

    console.log(numberOfRequest);

    if (numberOfRequest >= maxRequests) {
      throw new Error("APi request limit exceeded");
    }

    //8 To generate random number using crypto library.
    const randomNumber = crypto.randomInt(1, 1000000);

    //* To store/add data/request in a sorted set.
    await redisClient.zAdd(key, [
      { score: currentTime, value: `${currentTime}:${randomNumber}` },
    ]);

    await redisClient.expire(key, windowSize);

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = rateLimiter;
