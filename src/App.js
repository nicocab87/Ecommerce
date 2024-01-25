const express = require("express");
const ProductManager = require ("./ProductManager");

// Creación de productos

const nuevoProducto = new ProductManager (`./Productos.JSON`)

nuevoProducto.addProduct('TV', 'Televisor LED 4K', 50000, 'tv.jpg', 'TV001', 10);
nuevoProducto.addProduct('Laptop', 'Laptop de alta gama', 80000, 'laptop.jpg', 'LP001', 15);
nuevoProducto.addProduct('Teléfono', 'Smartphone con cámara dual', 15000, 'phone.jpg', 'PH001', 20);
nuevoProducto.addProduct('Refrigerador', 'Refrigerador de dos puertas', 30000, 'fridge.jpg', 'RF001', 5);
nuevoProducto.addProduct('Micrófono', 'Micrófono USB de estudio', 1000, 'mic.jpg', 'MC001', 30);
nuevoProducto.addProduct('Cámara', 'Cámara DSLR de 24MP', 40000, 'camera.jpg', 'CM001', 8);
nuevoProducto.addProduct('Auriculares', 'Auriculares inalámbricos', 2000, 'headphones.jpg', 'HD001', 25);
nuevoProducto.addProduct('Impresora', 'Impresora láser a color', 6000, 'printer.jpg', 'PR001', 12);
nuevoProducto.addProduct('Tablet', 'Tableta con pantalla táctil', 12000, 'tablet.jpg', 'TB001', 18);
nuevoProducto.addProduct('Altavoces', 'Altavoces Bluetooth', 3000, 'speakers.jpg', 'SP001', 22);

// Fin de creación de productos

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


