const { CatchAsync } = require('../Error/CatchAsync');
const { setUserData } = require('../Middleware/redis');
const Blog = require('../Model/blogModel');
const User = require('../Model/userModel');

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

// THIS ROUTE HANDLE THE USERS VOTE TO BLOG
exports.recordAction = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  // PUSH ACTION TO THE PARTICULAR BLOG VOTES
  user.action[req.body.field].push(req.body.blogId);
  await user.save();

  // UPDATE CACHE DATA
  setUserData(user._id, user);

  const blog = await Blog.findById(req.body.blogId);
  // UPDATE VOTE COUNT IN BLOG DATABASE
  blog[req.body.field]++;
  await blog.save();
  res.status(200).json({
    status: true,
    message: 'user action added success!',
    data: {
      user,
    },
  });
});
