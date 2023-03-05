const { CatchAsync } = require('../Error/CatchAsync');
const Reply = require('../Model/replyModel');

exports.addReply = CatchAsync(async (req, res, next) => {
  req.body.userId = req.user._id;
  req.body.userName = req.user.username;
  const reply = await Reply.create(req.body);
  res.status(201).json({
    status: true,
    message: 'Reply submitted succuss!',
    data: {
      reply,
    },
  });
});
exports.addSubReply = CatchAsync(async (req, res, next) => {
  req.body.userId = req.user._id;
  req.body.userName = req.user.username;
  const reply = await Reply.findById(req.body.id);
  delete req.body.id;
  reply.nestReply.push(req.body);
  await reply.save();
  res.status(201).json({
    status: true,
    message: 'Reply submitted succuss!',
    data: {
      reply,
    },
  });
});
