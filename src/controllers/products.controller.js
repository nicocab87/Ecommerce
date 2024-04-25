const productService = require("../repositories/index")


class productsController{
    static async get(req, res){
        let page = req.query.page || 6
        let limit = req.query.limit || 6
        let query = req.query.query
        let querySort = req.query.sort
        let opt = {}
        let sort

        if(req.query.query){
            opt = {
                $or: [
                    { description: { $regex: query, $options: 'i' } }, 
                    { category: { $regex: query, $options: 'i' } }
                ]
            }
        }

        querySort === "asc" && (sort = { price: -1 })
        querySort === "desc" && (sort = { price: 1 })

        let { docs, ...rest } = await productService.paginate(page, limit, opt, sort)

        let product = docs

        let nextLink = rest.hasNextPage ? `products?page=${rest.nextPage}&limit=${limit} ` : null
        let prevLink =rest.hasPrevPage ? `products?page=${rest.prevPage}&limit=${limit} ` : null
        
        try {
            res.send({product, ...rest, nextLink, prevLink})
        } catch (error) {
            res.status(440).send(error)
        }
    }

    static async create (req, res){
        const product = req.body
        try {
            //const methods = Object.keys(productsService);
            //console.log(methods,'a');
            //console.log(productService.create, 'funcion?')
            const data = await productService.create(product)
            console.log(data, 'data ')
            res.send({status:`succes`, payload: data})

        } catch (error) {
            res.status(400).send(`Error, datos incompletos o código repetido`)
            console.error(error)
        }
    }

    static async update(req, res){
        const productId = req.params.pid
        const productToUpdate = req.body

        try {
            //const data = await manager.updateProduct(productId, productToUpdate)
            res.send({status:`succes`, payload: await productService.update(productId, productToUpdate)})
        } catch (error) {
            res.status(404).send('Id o propiedad a cambiar no existe')
            console.error(error)
        }
    }

    static async delete(req, res){
        const productId = req.params.pid
        try {
            //const data = await .deleteProduct(productId)
            res.send({status:`succes`, payload: await productService.delete(productId)})
        } catch (error) {
            res.status(404).send(error)
        }    
    }
}

module.exports = productsController
