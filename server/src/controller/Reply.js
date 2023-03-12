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
