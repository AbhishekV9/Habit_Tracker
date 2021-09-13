const mongoose=require('mongoose');

const HabitSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    completed:{
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