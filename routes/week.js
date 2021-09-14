const express=require('express');
const router=express.Router();

const weekController=require('../controller/weekController');

router.get('/',weekController.weekView);
router.get('/update/:id/:day/:value',weekController.update);

module.exports=router;