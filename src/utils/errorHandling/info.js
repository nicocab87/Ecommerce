const getUserErrorInfo = (user)=>{
    return `Las propiedades no son válidas
    *fisrt_name: se espera String, se recibe${user.first_name},
    *last_name: se espera String, se recibe${user.last_name},
    *email: se espera String, se recibe${user.email},
    `
}

module.exports = getUserErrorInfo