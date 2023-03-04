const redis = require('redis');

const defaultExpiration = 6000;

const clint = redis.createClient({
  socket: {
    port: 6379,
    host: '127.0.0.1',
  },
});

clint
  .connect()
  .then(() => {
    console.log('Connected to Redis database!');
  })
  .catch((err) => {
    console.log('Error Connection Redis!!');
  });

exports.setUserData = (userId, user) => {
  clint.setEx(JSON.stringify(userId), defaultExpiration, JSON.stringify(user));
};

exports.getUserData = async (token) => {
  const user = await clint.get(JSON.stringify(token));
  return JSON.parse(user);
};
