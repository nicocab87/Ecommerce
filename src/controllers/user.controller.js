const userModel = require("../models/user")

class UserController{
    static async changeRole(req,res){
        const userId = req.params

        try {
            const user = await userModel.getById(userId)
            if(!['user','premium'].includes(user.rol)){
                throw new Error('No posees un rol valido')
            }
            if(user.rol == 'user'){
                user.rol == 'premium'
            }else{
                user.rol == 'user'
            }

            await userModel.updateOne({_id:userId}, user)

            res.send({status:'success'})
        } catch (error) {
            res.status(500).send({status:error, error:error.message})
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

}

module.exports = UserController