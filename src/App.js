const express = require("express");
const handlebars = require("express-handlebars");
const {Server} = require ("socket.io"); 
const productsRouter = require ("./Routes/Products.router");
const cartRouter = require("./Routes/Carts.router");
const realTimeRouter = require ("./Routes/RealTimeProducts.router")
const viewsRouter = require ("./Routes/views.router")
const manager = require ("./dao/dbManagers/products")
const mongoose = require("mongoose");
const chat_manager = require("./Routes/chat.router");



const app = express();
const port = 8080


// Handlebars setting
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set(`view engine`, `handlebars`);

app.use(express.static(`${__dirname}/public`));   

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(`/`, viewsRouter);
app.use(`/api/products`, productsRouter);
app.use(`/api/carts`, cartRouter);
app.use(`/realtimeproducts`, realTimeRouter)

// database connection
mongoose.connect('mongodb+srv://nicolasferreyram:L3fdrsl3K8rnQsdp@cluster0.hzrrjcf.mongodb.net/').then(()=>{
    console.log('Mongoose conected')
});


const server = app.listen(port,()=>console.log(`Se ha levantado el servidor ${port}`))

let messages = []

// Config Socket.io
const io = new Server (server);

io.on('connection', (socket)=>{
    console.log(`Conectado: ${socket.id}`);

    socket.on('disconnect', ()=>{
        console.log(`${socket.id} desconectado`);
    });

    socket.on('addProduct', async (newProductData)=>{
        await manager.addProduct(newProductData);

        const data = await manager.getProducts()

        io.emit('updateProduct', data);
    });

    socket.on('deleteProduct', async (idProductToDelete) => {
        await manager.deleteProduct(idProductToDelete)

        const data = await manager.getProducts()

        io.emit('updateProduct', data)
    });

    socket.on('userMessage', async (messageData) =>{
        messages.push(messageData)
        await chat_manager.newMessage(messages)
        io.emit('messages', messages)
    })

    socket.on('authenticated', ({user})=>{
        socket.emit('messages', messages)
        socket.broadcast.emit('newUser', {newUser : user})
    })
});




