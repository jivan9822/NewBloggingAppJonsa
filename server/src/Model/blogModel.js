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
      default: '#',
    },
    category: {
      type: String,
      default: 'others',
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
    pubLishedAt: {
      type: Date,
      default: Date.now(),
    },
    // THIS WILL USE IN NEXT UPDATE WHERE EACH BLOG WILL VERIFY AND THE APPROVED TO DISPLAY
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved',
    },
  },
  {
    timestamp: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

blogSchema.virtual('replies', {
  ref: 'Reply',
  foreignField: 'blogId',
  localField: '_id',
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
