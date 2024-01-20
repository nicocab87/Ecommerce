const express = require("express");
const ProductManager = require ("./ProductManager");

const server = express();

server.get(`/`, (req, res)=>{
    res.send(`Bienvenidos, lea el archivo readme para empezar!`)
})

server.get('/products', async (req, res) => {

    const data = await nuevoProducto.getProducts();
    const productsLimit = req.query.limit;

    const productsFiltered = data.filter((products)=>products.id <= productsLimit)

    res.send(!productsLimit ? data : productsFiltered)
})

server.get(`/products/:pid`, async (req, res) => {
    const productId = req.params.pid
    const data = await nuevoProducto.getProductById(parseInt(productId))
    const error = `ERROR 404, el producto solicitado no existe`

    res.send(data ? data : error)
})

server.listen(8080,()=>console.log(`Se ha levantado el servidor 8080`))
