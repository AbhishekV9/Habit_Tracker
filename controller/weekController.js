const habits=require('../models/habit');

module.exports.weekView=function(req,res){
    habits.find({},function(err,habits){
        if(err){
            console.log('error in fetching habist form db',err);
            return;
        }
        res.render('week',{
            title:'Weekly View',
            habitList:habits,
        });
    })
}