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
