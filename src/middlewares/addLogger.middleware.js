const {devLogger, prodLogger} = require("../utils/loggers.utils");


const addLogger = (req, res, next)=>{

    switch (process.env.NODE_ENV) {
        case 'development':
            req.logger = devLogger
            break;
    
        default:
            req.logger = prodLogger
            break;
    }
    
    next()
}

module.exports = addLogger