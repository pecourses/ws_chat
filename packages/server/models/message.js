const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
    maxlength: 512
  }
}, {
  timestamps: true
});

const Message = model('Message', messageSchema);

module.exports = Message;
