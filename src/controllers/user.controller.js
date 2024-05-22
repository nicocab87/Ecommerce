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
}

module.exports = UserController