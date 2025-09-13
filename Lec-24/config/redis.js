const redis = require("redis");

//* Hot to create Redis
const redisClient = redis.createClient({
  username: "default",
  password: process.env.REDIS_PASS,
  socket: {
    host: process.env.REDIS_KEY,
    port: Number(process.env.REDIS_PORT),
  },
});

module.exports = redisClient;
