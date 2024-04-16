const dontenv = require('dotenv');

dontenv.config();

module.exports = {
    mongoPassword : process.env.MONGO_PASSWORD,
    sessionSecret : process.env.SESSION_SECRET,
    port : process.env.PORT,
}