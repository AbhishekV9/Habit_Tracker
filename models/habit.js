const mongoose=require('mongoose');

const HabitSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Completed:{
        type:Number
    },
    Streak:{
        type:Number
    },
    TodaysDate:{
        type:Number
    },
    Days:[]
});

const Habit=mongoose.model('Habits',HabitSchema);

module.exports=Habit;