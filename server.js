const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

const session = require('express-session')
const passport = require('passport')

//database 
const db = require('./model')
//routes
const userroute = require('./route/user')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());

(async()=>{
    await db.sequelize.sync();
})();

app.use('/user',userroute);
app.listen(process.env.PORT || 5000,(err)=>{
    if(err) throw err;
    console.log(`server started at port ${process.env.PORT}`)
    
})