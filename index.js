class ProductManager {
    #id=1;

    constructor(){
        this.products = []
    }
    
    addProduct(title, description,price,thumbnail,code,stock){
        let product = {}

        product.title = title;
        product.description = description;
        product.price = price;
        product.thumbnail = thumbnail;
        product.code = code;
        product.stock = stock;
        product.id = this.#id++

        title && description && price && thumbnail && code && stock && (!this.products.some((producto)=> code === producto.code)) ? this.products.push(product) : console.error(`Falta agregar datos y/o el codigo agregado ya existe`)
    }

    getProducts () { return this.products }

    getProductById(id){
        const searchProduct = this.products.find ((product) => id === product.id)

        return (searchProduct ? searchProduct : console.error('El producto no existe'))
    }
} 


