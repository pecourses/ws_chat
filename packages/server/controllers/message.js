const { Message } = require('./../models');

module.exports.getMany = async (req, res, next) => {
  try {
    const getMessages = await Message.find();
    res.status(200).send({ data: getMessages });
  } catch (err) {
    res.status(500).send();
  }
};
