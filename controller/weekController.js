const habits = require('../models/habit');
const Month = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
//for weekview module:-
module.exports.weekView = function (req, res) {
  let today = new Date();
  let days = [];
  for (let i = 0; i < 7; i++) {
    let date =
    today.getDate() + '-' + Month[today.getMonth()] + ' ' + today.getFullYear();
      today.setDate(today.getDate() - 1); 
    days.push(date);
  }
  //rereese array
  days.reverse();
  habits.find({}, function (err, habit) {
    chekDates(habit);
    if (err) {
      console.log('error in fetching habist form db', err);
      return res.redirect('back');
    }
    return res.render('week', {
      title: 'Weekly View',
      habitList: habit,
      days:days
    });
  });
};

//update controller to update the track of your task as completed,incomplete or none
module.exports.update = function (req, res) {
  let id = req.params.id;
  let day = req.params.day;
  let value = req.params.value;
  habits.findById(id, (error, habit) => {
    if (error) {
      console.log(error);
      return res.redirect('back');
    }
    habit.Days[day] = value;
    habit.save();
    calculateStreak(habit);
    return res.redirect('back');
  });
};

//if the date when habit was created and the date you are viewing this page is not same then this function swaps the track of your habit accordingly
const chekDates = function (habits) {
  let currentDate = new Date().getDate();
  for (let h of habits) {
    const id = h.id;
    const difference = currentDate - h.TodaysDate;
    if(difference<0){
      difference= difference * (-1);
    }
    if (difference !== 0) {
      for (let j = difference, k = 0; j < h.Days.length; j++, k++) {
        h.Days[k] = h.Days[j];
      }
      const nextPos = h.Days.length - difference;
      for (let j = nextPos; j < h.Days.length; j++) {
        h.Days[j] = 'None';
      }
      h.TodaysDate = currentDate;
      h.save();
      calculateStreak(h);
    }else if(difference>6){
      for(let j=0;j<h.dayas.length;j++){
        h.Days[j]='None';
      }
      h.TodaysDate = currentDate;
      h.save();
      calculateStreak(h);
    }
  }
};


//this function calculate the completed days and longest streak
const calculateStreak = async function (habit) {
  try {
    let noOfCompletedDays = 0;
    let currentStrek = 0;
    let streak = 0;
    for (let i = 0; i < habit.Days.length; i++) {
      if (habit.Days[i] === 'Completed') {
        noOfCompletedDays++;
        currentStrek++;
       
      } else {
        if (currentStrek > streak) {
          streak = currentStrek;
          currentStrek = 0;
        }else{
          currentStrek=0;
        }
      }
    }
    if (currentStrek > streak) {
      streak = currentStrek;
    }
    await habits.findByIdAndUpdate(habit.id, {
      Streak: streak,
      Completed: noOfCompletedDays,
    });
  } catch (err) {
    console.log(err);
  }
};
