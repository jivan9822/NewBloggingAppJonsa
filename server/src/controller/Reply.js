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

exports.editMainReply = CatchAsync(async (req, res, next) => {
  const reply = await Reply.findById(req.body.id);
  if (req.body.index >= 0) {
    reply.nestReply[req.body.index].reply = req.body.reply;
  } else {
    reply.reply = req.body.reply;
  }
  await reply.save();
  res.status(200).json({
    status: true,
    message: 'ReplyUpdate Success!',
    data: {
      reply,
    },
  });
});

exports.deleteMainReply = CatchAsync(async (req, res, next) => {
  const reply = await Reply.findById(req.body.id);
  if (req.body.index >= 0) {
    reply.nestReply.splice(req.body.index, 1);
    await reply.save();
  } else {
    reply.remove();
  }
  res.status(204).json({
    status: true,
    message: 'ReplyUpdate Success!',
    data: null,
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
