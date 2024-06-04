const supertest = require('supertest');

const request = supertest("http://localhost:8080");

describe("api/carts test", ()=>{
    let cartID

    it('el endpoint debe crear un carrito correctamente', async () => {
        const chai = await import('chai');
        const expect = chai.expect;
        
        const {_body, statusCode} = await request.post('/api/carts')
        cartID = _body.payload._id
        expect(statusCode).to.be.equal(200)
        expect(_body).to.have.property("payload")
    });

    it('el endpoint debe obtener el carrito anteriormente creado', async () => {
        const chai = await import('chai');
        const expect = chai.expect;
        
        const {_body, statusCode} = await request.get(`/api/carts/${cartID}`)

        expect(statusCode).to.be.equal(200)
        expect(_body).to.have.property("payload")
    });

    it('el endpoint debe eliminar el carrito anteriormente creado', async () => {
        const chai = await import('chai');
        const expect = chai.expect;
        
        const {_body, statusCode} = await request.delete(`/api/carts/${cartID}`)

        expect(statusCode).to.be.equal(200)
        expect(_body).not.to.have.property("payload")
    });
})