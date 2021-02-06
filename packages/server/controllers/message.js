const { Message } = require('./../models');

module.exports.getMany = async (req, res, next) => {
  try {
    const getMessages = await Message.find().sort({ createdAt: -1 }).limit(20);
    res.status(200).send({ data: getMessages });
  } catch (err) {
    res.status(500).send();
  }
};
