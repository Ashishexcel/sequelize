const express = require('express');
const router = express.Router();
const {models:{User}} = require('../model');




const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 

//

//token middleware
const verifywithjwt = require('../middleware/verifywithjwt')

//image controller
// const {image,onlineimage} = require('../controller/imagecontroller');
// const upload = require('../utils/cloudinary');
// const {onlineuploader,image} = require('../controller/imagecontroller')
// const folderupload = require('../utils/multer')





//passport config

// passport.serializeUser(User.serializeUser()); 
// passport.deserializeUser(User.deserializeUser());


// const authwithpassportsignup = require('../passport/passportsignup');

// passport.use(new LocalStrategy(User.authenticate()));

// const registerwithpassport = require('../controller/registration')

const initializelogin = require('../passport/passportlogin')



//controller
// const {getuser,deleteuser,pagination,loginwithpassport,address,userwithaddress,deleteaddress}= require('../controller/usercontroller');
// const {fgproute,verifypasswordreset} = require('../controller/forgotpassword')
const {registerwithpassport,loginwithpassport,getuser,deleteuser,pagination,address,deleteaddress,fgproute,verifypasswordreset,userwithaddress}  =require('../controller/user')

//scraping controller
// const {flipscrap,snapscrap,flipscrapdetail} = require('../controller/scrap')


//login reg routes
// authwithpassportsignup(passport,async(id)=>{
//     await UserSignup.findById(id)
// })
// router.post('/registration',register);
router.post('/registration', registerwithpassport)

// router.post('/login',login);

initializelogin(passport,(id)=>{User.findOne({id:id})})
router.post('/login',passport.authenticate('local'),loginwithpassport); 








//other routes

router.get('/get',verifywithjwt,getuser);

router.put('/delete',verifywithjwt,deleteuser);

router.get('/list/:page',pagination);

router.post('/address',verifywithjwt,address)

router.get('/get/:id',verifywithjwt,userwithaddress)

router.delete('/address',verifywithjwt,deleteaddress)

router.get('/forgot-password',verifywithjwt,fgproute);

router.put('/verify-reset-password/:passwordreset',verifywithjwt,verifypasswordreset);


// router.get('/fetch/flipkart/mobile',flipscrap);

// router.get('/fetch/snapdeal/t-shirt',snapscrap);    
// router.get('/fetch/flipkart/mobile/full',flipscrapdetail);


module.exports = router;