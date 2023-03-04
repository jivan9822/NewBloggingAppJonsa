const { CatchAsync } = require('../Error/CatchAsync');
const { setUserData } = require('../Middleware/redis');
const Blog = require('../Model/blogModel');
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

exports.isValid = CatchAsync(async (req, res, next) => {
  return res.status(200).json({
    status: true,
    message: 'success',
    data: {
      user: req.user,
    },
  });
});

exports.addBlog = CatchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  const blog = await Blog.create(req.body);
  res.status(201).json({
    status: true,
    message: 'Blog added success!',
    data: {
      blog,
    },
  });
});

exports.updateBlog = CatchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: true,
    message: 'Blog update success!',
    data: {
      blog,
    },
  });
});

exports.deleteBlog = CatchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndDelete({ _id: req.body.id });
  res.status(204).json({
    status: true,
    data: null,
  });
});

exports.recordAction = CatchAsync(async (req, res, next) => {
  console.log(req.body);
  res.send('Action!');
});

exports.getAllBlogs = CatchAsync(async (req, res, next) => {
  const blogs = await Blog.find();
  res.status(200).json({
    status: true,
    message: 'Success!',
    data: {
      blogs,
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
