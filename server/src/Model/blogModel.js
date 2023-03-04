const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please provide blog text'],
    },
    source: {
      type: String,
      required: [true, 'Please source URL'],
    },
    category: {
      type: String,
      required: [true, 'Please provide category of blog'],
    },
    like: {
      type: Number,
      default: 0,
    },
    mindBlowing: {
      type: Number,
      default: 0,
    },
    disLike: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved',
    },
  },
  { timestamp: true }
);

blogSchema.pre(/^find/, function (next) {
  this.find({ isDeleted: false });
  next();
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
