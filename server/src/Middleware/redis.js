const redis = require('redis');

const defaultExpiration = 6000;

const client = redis.createClient({
  password: process.env.redisKey,
  socket: {
    host: process.env.redisHost,
    port: process.env.redisPort,
  },
});

client
  .connect()
  .then(() => {
    console.log('Connected to Redis database!');
  })
  .catch((err) => {
    console.log(err);
    console.log('Error Connection Redis!!');
  });

exports.setUserData = (userId, user) => {
  clint.setEx(JSON.stringify(userId), defaultExpiration, JSON.stringify(user));
};

exports.getUserData = async (token) => {
  const user = await clint.get(JSON.stringify(token));
  return JSON.parse(user);
};
