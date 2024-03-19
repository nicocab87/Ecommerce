const passport = require("passport");
const local = require("passport-local");
const githubStategy = require ("passport-github2")
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

    passport.use('github', new githubStategy({
        clientID: 'Iv1.34c0b9c475644c91',
        callbackURL: 'http://localhost:8080/api/session/githubCallback',
        clientSecret: '1804dbf3d19cb4d73a85fdb79bf559d450d8c92a'
    }, async (_accesToken, _refreshToken, profile, done)=>{
        try {
            const user = await userModel.findOne({email: profile._json.email})

            if(!user){
                let newUser = {
                    first_name : profile._json.name,
                    last_name : '',
                    age: 0,
                    email: profile._json.email
                }

                let result = await userModel.create(newUser)
                return done(null, result)
            }else{
                return done(null, user)
            }
        } catch (error) {
            done(error)
            
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