const supertest = require('supertest');

const request = supertest("http://localhost:8080");

describe('api/products test', async () => {
    //Para que funcione se necesita comentar la parte del código que verifica si sos usuario admin

    // it('el endpoint debe crear productos correctamente', async () => {
    //     const chai = await import('chai');
    //     const expect = chai.expect;
        
    //     const newProduct = {
    //         title: "producto de prueba",
    //         category: "Test",
    //         description: "Esto es una prueba",
    //         price: 1905,
    //         code: "TEST12",
    //         stock: 68
    //     }
    //     const {_body, statusCode} = await request.post('/realtimeproducts').send(newProduct);
    //     expect(statusCode).to.be.equal(200)
    //     expect(_body.payload).to.have.property("_id")
    // });

    it('el endpoint debe modificar el prododucto correctamente', async () => {
        const chai = await import('chai');
        const expect = chai.expect;
        
        const modificatedProduct = {
            title: "producto de prueba2",
            category: "Test2",
            description: "Esto es una prueba2",
            price: 1905,
            code: "TEST123444",
            stock: 689
        }
        const {_body, statusCode} = await request.put('/api/products/665e59e28486d3879903dfc5').send(modificatedProduct);
        expect(statusCode).to.be.equal(200)
        expect(_body.payload.title).to.be.equal(modificatedProduct.title)
    });

    // it('el endpoint debe eliminar el prododucto correctamente', async () => {
    //     const chai = await import('chai');
    //     const expect = chai.expect;
        
    //     const {_body, statusCode} = await request.delete('/api/products/665e59e28486d3879903dfc5');
    //     expect(statusCode).to.be.equal(200)
    //     expect(_body).not.to.have.property("payload")
    // });
});