const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    user: String,
    message: String
});

const ChatModel = mongoose.model('chat', chatSchema);

module.exports = ChatModel;