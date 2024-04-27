class TicketService{
    constructor(dao){
        this.dao = dao
    }

    async getAll(){
        return this.dao.getAll()
    }

    async getById(id){
        const product = await this.dao.getById(id)
        if(!product) throw {message:'no hay ticket con este id', status:400}
        return product
    }

    async create(product){
        return await this.dao.create(product)
    }
    
    async update(id, product){
        await this.dao.getById(id)
        return await this.dao.update(id, product)
    }

    async delete(id){
        const product = await this.dao.getById(id)
        return await this.dao.delete(id)
    }

    async generate(email, totalAmount){
        const ticket = await this.dao.create({
            code:`${Math.random()}`,
            purchase_dateTime: new Date().toLocaleString,
            amount:totalAmount,
            purchaser:email
        })

        console.log(ticket, 'este es el ticket')

        return ticket
    }
}

module.exports = TicketService