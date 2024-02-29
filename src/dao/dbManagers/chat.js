const ChatModel = require("../../models/chat");

class ChatManager {
    constructor (){}

    async newMessage (messageData){
        try {
            const exist = await ChatModel.findOne({})
            if(!exist) {
                await ChatModel.create({})
            }
            await ChatModel.updateOne({}, { $set: { chat: messageData } })

        } catch (error) {
            console.error('Error al buscar o actualizar el chat:', error)
            throw error
        }
    }
}



module.exports = ChatManager