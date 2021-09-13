const express=require('express');
const router=express.Router();

const homeController=require('../controller/homeController');

router.get('/',homeController.home);

router.use('/weekview',require('./week'));

module.exports=router;