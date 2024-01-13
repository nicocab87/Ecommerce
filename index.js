const fs = require ('fs')

class ProductManager {
    #id=1;

    constructor(){
        this.products = []
    }
    
    async addProduct(title, description,price,thumbnail,code,stock){
        let product = {}

        product.title = title;
        product.description = description;
        product.price = price;
        product.thumbnail = thumbnail;
        product.code = code;
        product.stock = stock;
        product.id = this.#id++

        const validation = title && description && price && thumbnail && code && stock && (!this.products.some((producto)=> code === producto.code))

        if (validation){
            this.products.push(product)
            await fs.promises.writeFile('Productos.json', JSON.stringify(this.products))
            
        }else{
            console.error(`Falta agregar datos y/o el codigo agregado ya existe`)
        }
    }

    async getProducts () { 
        const contenido = await fs.promises.readFile('Productos.json', 'utf-8')
        const productos = JSON.parse(contenido)

        return console.log(productos)
    }

    async getProductById(id){
        const contenido = await fs.promises.readFile('Productos.json', 'utf-8')
        const productos = JSON.parse(contenido)
        const searchProduct = productos.find ((product) => id === product.id)
        
        return (searchProduct ? console.log(searchProduct) : console.error('El producto no existe'))
    }

    async updateProduct(id, propietyToChange, value){
        const productParsed = JSON.parse(await fs.promises.readFile('Productos.json', 'utf-8'))
        const searchProduct = productParsed.find ((product) => id === product.id)
        searchProduct[propietyToChange] = value
        fs.writeFileSync('Productos.json', JSON.stringify(productParsed))

    }
}

const nuevoProducto = new ProductManager()

nuevoProducto.addProduct('titulo', 'descripcion', 500, 'sin imagen', 'abc123', 10)
nuevoProducto.addProduct('tituslo', 'descripcion', 500, 'sin imagen', 'abc12d3', 10)
nuevoProducto.addProduct('titulo', 'descripcion', 500, 'sin imagen', 'abc12ds3', 10)



