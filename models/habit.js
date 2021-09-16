const mongoose=require('mongoose');

//schema for habit
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

const Habit=mongoose.model('Habit',HabitSchema);

module.exports=Habit;