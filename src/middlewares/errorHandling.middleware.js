const { errorTypes } = require("../utils/errorHandling/errorTypes");

export const errorMiddleware = (error, req, res, next)=>{
    console.log(error.cause)
    switch (erro.code) {
        case errorTypes.INVALID_TYPE:
            res.status(400).send({status:'Error', error: error.name})
            break;
    
        default:
            res.status(500).send({status:'Error', error: 'Error desconocido'})
        
            break;
    }
}   