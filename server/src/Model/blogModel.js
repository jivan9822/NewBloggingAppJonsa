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
    // THIS WILL USE IN NEXT UPDATE WHERE EACH BLOG WILL VERIFY AND THE APPROVED TO DISPLAY
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved',
    },
  },
  { timestamp: true }
);

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
