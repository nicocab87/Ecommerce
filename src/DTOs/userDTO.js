class UserDTO{
    constructor(user){
        console.log(user,'userDTO')
        this.name = user.name
        this.email= user.email,
        this.age = user.age,
        this.role = user.rol
    }
}

module.exports = UserDTO