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
    votesInteresting: {
      type: Number,
      default: 0,
    },
    votesMindblowing: {
      type: Number,
      default: 0,
    },
    votesFalse: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
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
