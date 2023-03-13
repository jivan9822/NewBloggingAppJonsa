const { CatchAsync } = require('../Error/CatchAsync');
const Reply = require('../Model/replyModel');

exports.addMainReply = CatchAsync(async (req, res, next) => {
  console.log(req.body);
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
  console.log(req.body);
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
