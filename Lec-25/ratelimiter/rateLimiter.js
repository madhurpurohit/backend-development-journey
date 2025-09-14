const redisClient = require("../config/redis");

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;
    // console.log(ip);

    //* Logic to create Ratelimiter.
    const number_of_request = await redisClient.incr(ip); // It will automatically attach count with ip address, & if same ip comes than automatically increment count.
    console.log(number_of_request);

    if (number_of_request > 30) {
      throw new Error("Api Limit Exceeded.");
    }

    if (number_of_request == 1) await redisClient.expire(3600); // Here 10 is 10 seconds.

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = rateLimiter;
