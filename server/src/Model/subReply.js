const mongoose = require('mongoose');

const subReplySchema = mongoose.Schema({
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

const SubReply = mongoose.model('SubReply', subReplySchema);
module.exports = SubReply;
