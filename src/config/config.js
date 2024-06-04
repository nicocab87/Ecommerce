const dontenv = require('dotenv');

dontenv.config();

module.exports = {
    mongoLink: process.env.MONGO_CONNECTION_LINK,
    mongoPassword : process.env.MONGO_PASSWORD,
    sessionSecret : process.env.SESSION_SECRET,
    port : process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,

    mailing:{
        service: process.env.MAIL_SERVICE,
        port: process.env.MAIL_PORT,
        auth:{
            user: process.env.MAIL_AUTH_USER,
            pass: process.env.MAIL_AUTH_PASS
        }
    }
}