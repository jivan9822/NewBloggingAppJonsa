const { CatchAsync } = require('../Error/CatchAsync');
const { setUserData } = require('../Middleware/redis');
const Blog = require('../Model/blogModel');
const User = require('../Model/userModel');

exports.addBlog = CatchAsync(async (req, res, next) => {
  req.body.data.user = req.user._id;
  const blog = await Blog.create(req.body.data);
  res.status(201).json({
    status: true,
    message: 'Blog added success!',
    data: {
      blog,
    },
  });
});

exports.getAllBlogs = CatchAsync(async (req, res, next) => {
  const blogs = await Blog.find().populate('replies');
  res.status(200).json({
    status: true,
    message: 'Success!',
    data: {
      blogs,
    },
  });
});

exports.updateBlog = CatchAsync(async (req, res, next) => {
  req.body.data.pubLishedAt = Date.now();
  const blog = await Blog.findByIdAndUpdate(req.body.id, req.body.data, {
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
  console.log(req.body);
  const { blogId, field, userId, action } = req.body;

  const user = await User.findById(userId);
  const blog = await Blog.findById(blogId);
  if (action) {
    user.action[field].push(blogId);
    blog[field]++;
  } else {
    const index = user.action[field].indexOf(blogId);
    if (index > -1) user.action[field].splice(index, 1);
    blog[field]--;
  }

  await user.save();
  await blog.save();

  // UPDATE CACHE DATA
  setUserData(user._id, user);

  res.status(200).json({
    status: true,
    message: 'user action added success!',
    data: {
      user,
    },
  });
});
