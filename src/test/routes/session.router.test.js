const mongoose = require('mongoose');
const supertest = require('supertest')
const userModel = require ('../../models/user');
const { mongoLink } = require('../../config/config');


const request = supertest("http://localhost:8080");

mongoose.connect(mongoLink).then(()=>{
    console.log("se conecto a la base de datos")
})

describe("api/session test", ()=>{
    before(async ()=>{
        this.newUser = {
            first_name: 'test',
            last_name: 'avanzado',
            email: 'testAvanzado2@gmail.com',
            age:125,
            password: 'test12345'
        }
        await userModel.deleteMany({});
        
    })
    it('el endpoint debe crear un usuario correctamente', async () => {
        const chai = await import('chai');
        const expect = chai.expect;
        
        const {_body, statusCode} = await request.post('/api/session/register').send(this.newUser)
        expect(statusCode).to.be.equal(200)
        expect(_body.message).to.be.equal("user resgistered")
    });

    it('el endpoint debe logear un usuario correctamente', async () => {
        const chai = await import('chai');
        const expect = chai.expect;

        const {email, password} = await userModel.find({email: this.newUser.email})

        const {_body, statusCode} = await request.post('/api/session/login').send({email, password})
        expect(statusCode).to.be.equal(302)
//El statusCode es 302 porque hay una redireccion
    });

    it('el endpoint debe deslogear un usuario correctamente', async () => {
        const chai = await import('chai');
        const expect = chai.expect;

        const {_body, statusCode} = await request.get('/api/session/logout')
        expect(statusCode).to.be.equal(302)
        //El statusCode es 302 porque hay una redireccion
    });
})