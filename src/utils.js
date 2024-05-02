const { faker } = require('@faker-js/faker');
const bcrypt = require ('bcrypt');

const createHash = (password) => {
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return hashedPassword
}

const isValidPassword = (user, password) => {
    const isValid = bcrypt.compareSync(password,user.password)
    return isValid
}

const generateProduct = (number)=>{
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

module.exports = {
    createHash,
    isValidPassword,
    generateProduct
}