const winston = require ("winston");

const customLevel = {
    levels:{ fatal:0, error:1, warning:2, info:3, debug:4 },
    
    colors:{ fatal:'red', error: 'red', warning: 'yellow', info: 'blue', debug: 'red'}
}

const devLogger = winston.createLogger({
    levels: customLevel.levels,
    transports:[
        new winston.transports.Console({level:'debug', format: winston.format.combine(winston.format.colorize({colors:customLevel.colors}), winston.format.cli())})
    ]
})

const prodLogger = winston.createLogger({
    levels: customLevel.levels,
    transports:[
        new winston.transports.Console({level:'info', format: winston.format.combine(winston.format.colorize({colors:customLevel.colors}), winston.format.cli())}),
        new winston.transports.File({level: 'info', filename:'./prodErrors.log'})
    ]
})


module.exports = {
    devLogger,
    prodLogger
}
