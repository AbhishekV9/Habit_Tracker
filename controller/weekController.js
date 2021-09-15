const habits=require('../models/habit');

module.exports.weekView= function(req,res){
     habits.find({},function(err,habit){
        if(err){
            console.log('error in fetching habist form db',err);
            return;
        }
        chekDates(habit);
        res.render('week',{
            title:'Weekly View',
            habitList:habit,
        });
    })
}

module.exports.update= async function(req,res){
  try{
        id=req.params.id;
        day=req.params.day;
        value=req.params.value;
        const habit=await habits.findById(id);
        habit.Days[day]=value;
        await habits.findByIdAndUpdate(id,{Days:habit.Days});
        calculateStreak(habit);
        res.redirect('back');
  }catch(err){
    if(err){
        console.log("Error",err);
    }
  }
  
}

const chekDates =async function(habit){
    const currentDate=new Date().getDate()+2;
    for(let i of habit){
        const id=i.id;
        const h= await habits.findById(id);
        const difference=currentDate-h.TodaysDate;
        if(difference!==0){
            for(let j=difference,k=0;j<h.Days.length;j++,k++){
                h.Days[k]=h.Days[j];
            }
            const nextPos=h.Days.length-difference;
            for(let j=nextPos;j<i.Days.length;j++){                
                h.Days[j]='None';               
            }          
            await habits.findByIdAndUpdate(id,{
                Days:h.Days,
                TodaysDate:currentDate
            });
            calculateStreak(h);          
        }
        
    }
}

const calculateStreak= async function(habit){
    let noOfCompletedDays=0;
    let currentStrek=0;
    let streak=0;
    for(let i=0;i<habit.Days.length;i++){
        
        if(habit.Days[i]=='Completed'){
            noOfCompletedDays++;
            currentStrek++;
        }else{
            if(currentStrek>streak){
                streak=currentStrek;
                currentStrek=0;
            }
        }
    }
    if(currentStrek>streak){
        streak=currentStrek;
    }
    await habits.findByIdAndUpdate(habit.id,{
        Streak:streak,
        Completed:noOfCompletedDays
    })
}