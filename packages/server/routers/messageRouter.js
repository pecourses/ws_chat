const { Router } = require('express');
const messageController = require('./../controllers');

const messageRouter = Router();

messageRouter.use('/', messageController.getMany);

module.exports = messageRouter;
