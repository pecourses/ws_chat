const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Message = model('Message', messageSchema);

module.exports = Message;
