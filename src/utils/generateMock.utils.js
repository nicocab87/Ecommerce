const { faker } = require("@faker-js/faker");

export const generateProduct = (number)=>{
    let products = [];

    for (let i = 0; i <number; i++) {
        const product = {
            _id: faker.database.mongodbObjectId(),
            title: faker.commerce.productName(),
            category: faker.commerce.department(),
            description: faker.commerce.productDescription(),
            thumbnail: faker.image.image() ,
            price: faker.commerce.price(),
            code: faker.random.alphaNumeric(6)  ,
            stock: faker.number.int({ max: 200 }),
            status: faker.datatype.boolean() 
        }
        products.push(product)
    }

    return products
}