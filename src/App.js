const express = require("express");
const handlebars = require("express-handlebars");
const {Server} = require ("socket.io"); 
const productsRouter = require ("./Routes/Products.router");
const cartRouter = require("./Routes/Carts.router");
const realTimeRouter = require ("./Routes/RealTimeProducts.router");
const viewsRouter = require ("./routes/views.router")
const sessionRouter = require ("./routes/session.router");
const mongoose = require("mongoose");
const chat_manager = require("./Routes/chat.router");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const initializePassport = require("./config/passport.config");
const { sessionSecret, mongoPassword, port } = require("./config/config");
const productsService = require("./services/products.service");
const cartsService = require("./services/carts.service");
const userModel = require("./models/user");
const sessionController = require("./controllers/session.contoller");
require ('dotenv').config();

const app = express();

// Handlebars setting
const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
});

app.engine('handlebars', hbs.engine);
app.set('views', `${__dirname}/views`);
app.set(`view engine`, `handlebars`);

// database connection
mongoose.connect(`mongodb+srv://nicolasferreyram:${mongoPassword}@cluster0.hzrrjcf.mongodb.net/`).then(()=>{
    console.log('Mongoose conected')
});

// Session Setting

app.use(session({
    secret: `${sessionSecret}`,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:`mongodb+srv://nicolasferreyram:${mongoPassword}@cluster0.hzrrjcf.mongodb.net/`,
        ttl: 60*60
    })
}))


// Middleware
app.use(express.static(`${__dirname}/public`));   
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Routes

app.use(`/`, viewsRouter);
app.use(`/api/products`, productsRouter);
app.use(`/api/carts`, cartRouter);
app.use(`/realtimeproducts`, realTimeRouter);
app.use('/api/session', sessionRouter)


const server = app.listen(port,()=>console.log(`Se ha levantado el servidor ${port}`))

// Config Socket.io
const io = new Server (server);
const productService = new productsService()
const cartService = new cartsService()
let messages = []

io.on('connection', (socket)=>{
    console.log(`Conectado: ${socket.id}`);

    socket.on('disconnect', ()=>{
        console.log(`${socket.id} desconectado`);
    });

    socket.on('addProduct', async (newProductData)=>{
        await productService.create(newProductData);

        const data = await productService.getAll()

        io.emit('updateProduct', data);
    });

    socket.on('deleteProduct', async (idProductToDelete) => {
        await productService.delete(idProductToDelete)

        const data = await productService.getAll()

        io.emit('updateProduct', data)
    });

    socket.on('userMessage', async (messageData) =>{
        messages.push(messageData)
        await chat_manager.newMessage(messages)
        io.emit('messages', messages)
    })

    socket.on('authenticated', (user)=>{
        socket.emit('messages', messages)
        socket.broadcast.emit('newUser', {newUser : user})
    })
});




