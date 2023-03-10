const mongoose = require('mongoose');

const replySchema = mongoose.Schema({
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
});

const Reply = mongoose.model('Reply', replySchema);
module.exports = Reply;
