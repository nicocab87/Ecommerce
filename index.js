const fs = require ('fs')

class ProductManager {
    #id=1;

    constructor(path){
        this.products = []
        this.path = path
        this.iniciarPath()
    }

    async iniciarPath(){
        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
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
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            
        }else{
            console.error(`Falta agregar datos y/o el codigo agregado ya existe`)
        }
    }

    async getProducts () { 
        const contenido = await fs.promises.readFile(this.path, 'utf-8')
        const productos = JSON.parse(contenido)

        return productos
    }

    async getProductById(id){
        const contenido = await fs.promises.readFile(this.path, 'utf-8')
        const productos = JSON.parse(contenido)
        const searchProduct = productos.find ((product) => id === product.id)
        
        return (searchProduct ? searchProduct : console.error('El producto no existe'))
    }

    async updateProduct(id, propietyToChange, value){
        const productParsed = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        const searchProduct = productParsed.find ((product) => id === product.id)
        searchProduct[propietyToChange] = value

        return await fs.promises.writeFile(this.path, JSON.stringify(productParsed))
    }

    async deleteProduct (id){
        const productParsed = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        const productsFiltered = productParsed.filter ((product) => id !== product.id)
        console.log(productsFiltered)
        
        return await fs.promises.writeFile(this.path, JSON.stringify(productsFiltered,null))
    
    }

}


