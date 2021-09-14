const express=require('express');
const router=express.Router();

const homeController=require('../controller/homeController');

router.get('/',homeController.home);
router.post('/create/habit',homeController.create);
router.get('/delete/:id',homeController.delete);

router.use('/weekview',require('./week'));

module.exports=router;