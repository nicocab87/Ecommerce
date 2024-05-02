const { errorTypes } = require("./errorTypes")

export class CustomError extends Error {
    constructor({name="Error", cause, message, code=errorTypes.UNKOWN}){
        super(message)
        this.name=name,
        this.code=code,
        this.cause=cause
    }
}