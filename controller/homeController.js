//aquiring database model
const habits=require('../models/habit');

//for home module :- 
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

//controller for creating new Habit
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

//controller for deleting habit from habitlist
module.exports.delete=function(req,res){
    id=req.params.id;
    habits.findByIdAndDelete(id,function(err,habit){
        if(err){
            console.log('error in deleting from database');
            return;
        }
        res.redirect('back')
    })
}