const nodemailer = require('nodemailer');
const { mailing, jwtSecret } = require('../config/config');
const jwt = require('jsonwebtoken')

const transport = nodemailer.createTransport({
    service: mailing.service,
    port: mailing.port,
    auth: mailing.auth
})

class MailingService{
    
    async sendPassResetEmail(destinationMail, user){
        const payload = {...user}
        const passwordResetTocken = jwt.sign(payload,jwtSecret,{expiresIn:'1h'})
        await transport.sendMail({
            from: `Node Service ${mailing.auth.user}`,
            to: destinationMail,
            subject:`Password Reset`,
            html:`
                <div>
                    <h1> Haga click aqui para cambiar su contraseña</h1>
                    <a href="http://localhost:8080/api/session/verifyToken/${passwordResetTocken}">Resetear Contraseña"</a>
                </div>
            `
        })
    }

    async sendDeleteAcountEmail(destinationMail, user){
        const payload = {...user}
        const passwordResetTocken = jwt.sign(payload,jwtSecret,{expiresIn:'1h'})
        await transport.sendMail({
            from: `Node Service ${mailing.auth.user}`,
            to: destinationMail,
            subject:`Acount Deleted`,
            html:`
                <div>
                    <h1> Su cuenta ha sido eleminada por inactividad</h1>
                </div>
            `
        })
    }
}

module.exports = MailingService

//Nos quedamos minuto 37, resolver bug