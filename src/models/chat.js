const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: String,
    message: String,
    time: String
});

const chatSchema = new mongoose.Schema({
    chat: [messageSchema] 
});


const ChatModel = mongoose.model('chats', chatSchema);

module.exports = ChatModel;