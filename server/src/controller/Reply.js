const { CatchAsync } = require('../Error/CatchAsync');
const Reply = require('../Model/replyModel');
const mongoose = require('mongoose');

exports.addMainReply = CatchAsync(async (req, res, next) => {
  const reply = await Reply.create(req.body);
  res.status(201).json({
    status: true,
    message: 'Reply added Success!',
    data: {
      reply,
    },
  });
});

exports.updateMainReply = CatchAsync(async (req, res, next) => {
  const reply = await Reply.findByIdAndUpdate(
    req.body.id,
    {
      $set: { text: req.body.text },
    },
    { new: true }
  );
  res.status(200).json({
    status: true,
    message: 'Main reply update success!',
    data: {
      reply,
    },
  });
});

exports.deleteMainReply = CatchAsync(async (req, res, next) => {
  const reply = await Reply.findByIdAndDelete(req.body.id);
  res.status(204).json({
    status: true,
    message: 'Reply delete success!',
    data: null,
  });
});

exports.addSubReply = CatchAsync(async (req, res, next) => {
  const id = req.body.data.id;
  delete req.body.data.id;
  req.body.data.userId = req.user._id;
  req.body.data.userName = req.user.username;
  req.body.data.repliedAt = Date.now();

  const reply = await Reply.findByIdAndUpdate(
    id,
    {
      $push: { subReplies: req.body.data },
    },
    { new: true }
  );
  res.status(201).json({
    status: true,
    message: 'SubReply added Success!',
    data: {
      data: reply,
    },
  });
});

// MyModel.findByIdAndUpdate(
//   parentId,
//   { $set: { 'nestedArray.$[elem].name': newName } },
//   { new: true, arrayFilters: [{ 'elem._id': objectId }] },
//   (err, result) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(result);
//     }
//   }
// );

exports.updateSubReply = CatchAsync(async (req, res, next) => {
  const objectId = mongoose.Types.ObjectId(req.body.id);
  const reply = await Reply.findByIdAndUpdate(
    req.body.mainReplyId,
    {
      $set: { 'subReplies.$[elem].text': req.body.text },
    },
    {
      new: true,
      arrayFilters: [{ 'elem._id': objectId }],
    }
  );
  //!this is one of method to update
  // const reply = await Reply.findById(req.body.mainReplyId);
  // reply.subReplies.forEach((each) => {
  //   if (ObjectId(req.body.id).equals(each._id)) {
  //     each.text = req.body.text;
  //   }
  // });
  // await reply.save();
  res.status(200).json({
    status: true,
    message: 'Update subReply success!',
    data: {
      reply,
    },
  });
});

exports.deleteSubReply = CatchAsync(async (req, res, next) => {
  const reply = await Reply.findByIdAndUpdate(
    req.body.mainReplyId,
    {
      $pull: { subReplies: { _id: req.body.id } },
    },
    { new: true }
  );
  res.status(204).json({
    status: true,
    message: 'Delete Success!',
    data: null,
  });
});
