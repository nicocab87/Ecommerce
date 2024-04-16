const {Router} = require ("express");
const productsService = require("../services/products.service")
const viewControler = require("../controllers/view.controller");

const productService = new productsService()


const router = Router();

// Middlewares

const publicAccess = (req, res, next)=>{
    if(req.session.user) return res.redirect('/products')

    next();
}

const privateAccess = (req, res, next)=>{
    if(!req.session.user) return res.redirect('/login')

    next();
}

const isAdmin = (req, res, next) => {
    const data = req.session.user

    if(data && data.rol === 'admin'){
        next();
    } else {
        return res.redirect('/products');
    } 
}

// CRUD

router.get('/', viewControler.goHome)

router.get('/products', async (req, res) => {

    let page = req.query.page || 1
    let limit = req.query.limit || 5
    let query = req.query.query
    let querySort = req.query.sort
    let opt = {}
    let sort
    let userData = req.session.user

    if(req.query.query){
        opt = {
            $or: [
                { description: { $regex: query, $options: 'i' } }, 
                { category: { $regex: query, $options: 'i' } }
            ]
        }
    }

    querySort === "asc" && (sort = { price: -1 })
    querySort === "desc" && (sort = { price: 1 })

    let { docs, ...rest } = await productService.paginate(page, limit, opt, sort)

    let product = docs

    let nextLink = rest.hasNextPage ? `products?page=${rest.nextPage}&limit=${limit} ` : null
    let prevLink =rest.hasPrevPage ? `products?page=${rest.prevPage}&limit=${limit} ` : null


    res.render('products',{product, ...rest, nextLink, prevLink, userData})
})

router.get('/realtimeproducts', isAdmin, viewControler.goRealTimeProducts)

router.get('/chat', privateAccess , viewControler.goChat)

router.get('/carts/:cid', viewControler.goCart)

router.get('/register', publicAccess, viewControler.goRegister)

router.get('/login', publicAccess, viewControler.goLogin)

router.get('/profile', privateAccess, viewControler.goProfile)

router.get('/resetPassword', viewControler.goResetPassword)

router.get(`/:pid`, viewControler.goGetProductById)

module.exports = router;