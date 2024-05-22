const checkRole = (roles) =>(req,res,next)=>{
    const user=req.user

    if(!Array.isArray(roles)){
        roles=[roles]
    }

    if(!roles.includes(user.rol)){
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

const applyRolePolicy = (roles)=>{
    return (res, req, next)=>{
        if(role.includes("public")) {return next()}
    }
}

module.exports={
    checkRole,
    publicAccess,
    privateAccess,
    isAdmin,
    applyRolePolicy
}