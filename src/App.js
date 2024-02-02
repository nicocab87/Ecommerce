const express = require("express");
const productsRouter = require ("./Routes/Products.router")
const cartRouter = require("./Routes/Carts.router")


const app = express();
const port = 8080

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(`${__dirname}/public`))

app.use(`/api/products`, productsRouter)
app.use(`/api/carts`, cartRouter)


app.listen(port,()=>console.log(`Se ha levantado el servidor 8080`))


