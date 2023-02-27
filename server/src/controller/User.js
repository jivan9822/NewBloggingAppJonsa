const { CatchAsync } = require('../Error/CatchAsync');
const { setUserData } = require('../Middleware/redis');
const User = require('../Model/userModel');

exports.userSignUp = CatchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: true,
    message: 'User created success!',
    user,
  });
});

exports.userLogin = CatchAsync(async (req, res, next) => {
  res.cookie('jwt', req.token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
  setUserData(req.user._id, req.user);
  res.status(200).json({
    status: true,
    message: 'Login success!',
    data: {
      token: req.token,
      user: req.user,
    },
  });
});

exports.logOutHandler = CatchAsync(async (req, res, next) => {
  res.cookie('jwt', null);
  res.status(200).json({
    status: true,
    message: 'Logout success!',
  });
});
