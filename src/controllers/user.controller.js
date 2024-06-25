const userModel = require("../models/user")
const MailingService = require("../services/mailing.service")

class UserController{
    static async changeRole(req, res) {
        const { userId } = req.params;
        const { role: newRole } = req.body; 
        console.log(userId);
    
        try {
            const user = await userModel.findById(userId);
    
            if (!user) {
                return res.status(404).send({ status: 'error', message: 'User not found' });
            }
    
            if (!['user', 'premium', 'admin'].includes(newRole)) {
                throw new Error('No posees un rol valido');
            }
    
            user.rol = newRole;
            console.log(user);
    
            await userModel.updateOne({ _id: userId }, { rol: newRole });
    
            res.send({ status: 'success' });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.message });
        }
    }

    static async deleteUser(req, res){
        const { userId } = req.params
        try {
            const result = await userModel.deleteOne({ _id: userId })
            res.send({status: 'success'});
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.message });
        }
    }

    static async uploadDocument(req, res){
        const userId = req.params
        const file = req.files

        try {
            const user = await userModel.getById(userId)
            let documents = user.documents || [];

            documents = documents.concat(file.map(file=>{
                return {name: file.originalname, reference: file.path.split('public')[1].replace(/\\/g,'/')}
            }))

            //user.documents = documents

            const result = await userModel.updateOne({_id: user._id, documents})


            res.send({status:'success', payload: result})
        } catch (error) {
            res.status(500).send({status:error, error:error.message})
        }
    }

    static async uploadPicture(req, res){
        const userId = req.params
        const profilePicture = req.file

        try {
            const result = await userModel.updateOne({_id: userId, profilePicture})

            res.send({status:'success', payload: result})
        } catch (error) {
            res.status(500).send({status:error, error:error.message})
        }
    }

    static async deleteUnactive(req, res){
        try {
            const users = await userModel.getAll()
            const now = new Date()
            let deleteCount = 0

            for (const user of users) {
                if(user.last_connection){
                    if(getMinutesDiference(now, user.last_connection)>60*24*2){
                        await userModel.deleteOne(user._id)
                        await MailingService.sendDeleteAcountEmail(user.email, user)
                        deleteCount++
                    }
                }
            }

            const getMinutesDiference = (now,lastConnection) => {
                let miliSecondDif = now - lastConnection
                let minutes = Math.round((miliSecondDif/1000)/60)
                return minutes
            }
            res.send({status:'success', payload: deleteCount})

        } catch (error) {
            res.status(500).send({status:error, error:error.message})
        }
    }
}

module.exports = UserController