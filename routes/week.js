const express=require('express');
const router=express.Router();

const weekController=require('../controller/weekController');

router.get('/',weekController.weekView);

module.exports=router;