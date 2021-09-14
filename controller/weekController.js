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

module.exports.update= async function(req,res){
  try{
        id=req.params.id;
        day=req.params.day;
        value=req.params.value;
        const habit=await habits.findById(id);
        habit.Days[day]=value;
        await habits.findByIdAndUpdate(id,{Days:habit.Days});
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
        await habits.findByIdAndUpdate(id,{
            Streak:streak,
            Completed:noOfCompletedDays
        })
        res.redirect('back');

  }catch(err){

  }
  
}