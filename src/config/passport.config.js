const passport = require("passport");
const local = require("passport-local");
const { createHash, isValidPassword } = require("../utils");
const userModel = require("../models/user");

const localStrategy = local.Strategy;

const initializePassport = ()=>{
    passport.use('register', new localStrategy({
        passReqToCallback:true,
        usernameField: 'email'
    },  async (req, username, password, done)=>{
            const {first_name, last_name, email, age}= req.body

            let user = await userModel.findOne({email:username})
            try {
                if(user){
                    return done(null,false)
                }

                const newUser = {first_name, last_name, email, age, password: createHash(password)}
                const result = await userModel.create(newUser)
                return done(null, result)

            } catch (error) {
                return done(error)
            }
    }))

    passport.use('login', new localStrategy({
        usernameField: 'email'
    }, async (email,password, done) => {
        try {
            const user = await userModel.findOne({email});
            if(!user){
                return done(null, false)
            }

            if(isValidPassword(user, password)){
                return done(null, false)
            }

            return done(null, user)

        } catch (error) {
            return done(error)
        }     
    }))
}

passport.serializeUser((user, done)=>{
    done(null, user._id)
})

passport.deserializeUser(async (id, done)=>{
    let user = await userModel.findById(id);
    done(null, user)
})

module.exports = initializePassport;