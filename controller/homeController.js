const habits=require('../models/habit');

module.exports.home=function(req,res){
    habits.find({},function(err,habits){
        if(err){
            console.log(`Error in fetching habits from db:${err}`);
        }
        res.render('home',{
            title: 'Habit Tracker | Home' ,
            habitList:habits
        });
    });
}