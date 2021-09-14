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

module.exports.create=function(req,res){
    todays_date=new Date().getDate();   
    habits.create({
       Name:req.body.name,
       Completed:0,
       Streak:0,
       Days:['None','None','None','None','None','None','None'],
       TodaysDate:todays_date
    },function(err,newHabit){
        if(err){
            console.log('Error in Creating new Habit:',err);
            return;
        }
        res.redirect('back');
    })
}