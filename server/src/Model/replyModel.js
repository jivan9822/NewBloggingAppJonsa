const mongoose = require('mongoose');

const replySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    blogId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    reply: {
      type: String,
      required: true,
    },
    nestReply: {
      type: [Object],
      default: [],
    },
  },
  { timestamp: true }
);

const Reply = mongoose.model('Reply', replySchema);
module.exports = Reply;
