const habits=require('../models/habit');

module.exports.weekView=async function(req,res){
    try{
        const h=await chekDates();
        await habits.find({},function(err,habit){
            if(err){
                console.log('error in fetching habist form db',err);
                return;
            }
            return res.render('week',{
                title:'Weekly View',
                habitList:habit,
            });
        })
    }catch(err){
        console.log(err);
    }
}

module.exports.update= async function(req,res){
    try{
            let id=req.params.id;
            let day=req.params.day;
            let value=req.params.value;
            let habit=await habits.findById(id);
            habit.Days[day]=value;
            //await habits.findByIdAndUpdate(id,{Days:habit.Days});
            habit.save();
            calculateStreak(habit);
            return res.redirect('back');
    }catch(err){
            if(err){
                console.log("Error",err);
            }
    }
  
}

const chekDates =async function(){
    try{
        await habits.find({},async function(err,habit){
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
                    h.TodaysDate=currentDate;          
                    h.save();
                    await calculateStreak(h);          
                }        
            }
            console.log("controller",habit);
        });
        
    }catch(err){
        console.log(err);
    }
}

const calculateStreak= async function(habit){
    try{
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
    }catch(err){
        console.log(err);
    }
 }