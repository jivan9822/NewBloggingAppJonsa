const mongoose = require('mongoose');

const replySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    userName: {
      type: String,
      require: true,
    },
    blogId: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    text: {
      type: String,
      required: true,
    },
    subReplies: {
      type: [
        {
          userId: {
            type: mongoose.Types.ObjectId,
            required: true,
          },
          userName: {
            type: String,
            require: true,
          },
          text: {
            type: String,
            required: true,
          },
        },
      ],
    },
    repliedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    timestamp: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
replySchema.virtual('subreply', {
  ref: 'SubReply',
  foreignField: 'replyId',
  localField: '_id',
});

const Reply = mongoose.model('Reply', replySchema);
module.exports = Reply;
