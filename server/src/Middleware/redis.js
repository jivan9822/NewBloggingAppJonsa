const redis = require('redis');

const defaultExpiration = 6000;

// const client = redis.createClient({
//   password: process.env.redisKey,
//   socket: {
//     host: process.env.redisHost,
//     port: process.env.redisPort,
//   },
// });

const client = redis.createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379,
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
  client.setEx(JSON.stringify(userId), defaultExpiration, JSON.stringify(user));
};

exports.getUserData = async (token) => {
  const user = await client.get(JSON.stringify(token));
  return JSON.parse(user);
};
