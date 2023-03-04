const { CatchAsync } = require('../Error/CatchAsync');
const AppError = require('../Error/AppError');
const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');
const { promisify } = require('util');
const { getUserData } = require('./redis');

// USER LOGIN HANDLER
exports.authenticate = CatchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  const user = await User.findOne({ username: username }).select('+password');
  if (!user || !(await user.comparePass(password, user.password))) {
    return next(new AppError('Wrong username or password!', 400));
  }

  const token = jwt.sign({ id: user._id }, process.env.SEC_STRING);
  req.token = token;
  user.password = undefined;
  req.user = user;

  next();
});

// USER AUTHORIZATION HANDLED BY CACHE TO AVOID MULTIPLE DB CALLS
exports.protect = CatchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(
      new AppError(
        'You are not authorize to access this route! Please Login to get access!',
        403
      )
    );
  }
  const decode = await promisify(jwt.verify)(token, process.env.SEC_STRING);

  // SETTING USER TO CACHE
  const user = await getUserData(decode.id);

  if (!user) {
    res.cookie('jwt', null);
    return next(new AppError('You are not loggedIn! Please Login!', 401));
  }
  req.user = user;

  next();
});
