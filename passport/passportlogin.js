const passport = require('passport');
const bcrypt = require('bcrypt');
const { models: { User } } = require('../model');
const LocalStrategy = require('passport-local');

const initializelogin = (passport, getUSerByID) => {
    try {
        const authenticateUser = async (email, password, done) => {
            const user = await User.findOne({ where: { email: email } })
            
            if (!user) {
                return done(null, false, { message: "incorrect emaill" })
            }
            if (user == null) { return done(null, false, { message: "User not found" }) }

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                console.log("here")
                return done(null, user)
            } else {
                return done(null, password, { message: "password not matched" })
            }



        }
        passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser));
        passport.serializeUser((user, done) => { done(null, user.id) })
        passport.deserializeUser((id, done) => { return done(null, getUSerByID(id)) })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
};

module.exports = initializelogin;