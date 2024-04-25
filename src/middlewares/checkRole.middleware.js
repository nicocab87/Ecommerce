const checkRole = (role) =>(req,res,next)=>{
    const user=req.user

    if(user.role != role){
        return res.status(400).send({status:'Error', error:'No tienes la credencial para acceder a este sitio'})
    }
    next()
}

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

module.exports={
    checkRole,
    publicAccess,
    privateAccess,
    isAdmin
}