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
    
    async addProduct([title, category ,description, price,code,stock]){
        let product = {}

        product.title = title;
        product.category = category;
        product.description = description;
        product.price = price;
        product.thumbnail = null;
        product.code = code;
        product.stock = stock;
        product.status = true;
        product.id = this.#id++

        const validation = title && description && price && code && stock && (!this.products.some((producto)=> code === producto.code))

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

const nuevoProducto = new ProductManager (`./Productos.JSON`)

/* nuevoProducto.addProduct(['TV', 'Tecnologia','Televisor LED 4K', 50000, 'tv.jpg', 'TV001', 10]);
nuevoProducto.addProduct(['Laptop', 'Tecnologia','Laptop de alta gama', 80000, 'laptop.jpg', 'LP001', 15]);
nuevoProducto.addProduct(['Teléfono', 'Tecnologia','Smartphone con cámara dual', 15000, 'phone.jpg', 'PH001', 20]);
nuevoProducto.addProduct(['Refrigerador', 'Tecnologia','Refrigerador de dos puertas', 30000, 'fridge.jpg', 'RF001', 5]);
nuevoProducto.addProduct(['Micrófono', 'Tecnologia','Micrófono USB de estudio', 1000, 'mic.jpg', 'MC001', 30]);
nuevoProducto.addProduct(['Cámara', 'Tecnologia','Cámara DSLR de 24MP', 40000, 'camera.jpg', 'CM001', 8]);
nuevoProducto.addProduct(['Auriculares', 'Tecnologia','Auriculares inalámbricos', 2000, 'headphones.jpg', 'HD001', 25]);
nuevoProducto.addProduct(['Impresora', 'Tecnologia','Impresora láser a color', 6000, 'printer.jpg', 'PR001', 12]);
nuevoProducto.addProduct(['Tablet', 'Tecnologia','Tableta con pantalla táctil', 12000, 'tablet.jpg', 'TB001', 18]);
nuevoProducto.addProduct(['Altavoces', 'Tecnologia','Altavoces Bluetooth', 3000, 'speakers.jpg', 'SP001', 22]);
 */
module.exports = nuevoProducto