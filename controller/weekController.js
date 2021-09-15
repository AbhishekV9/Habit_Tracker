const habits = require('../models/habit');

module.exports.weekView = function (req, res) {
  habits.find({}, function (err, habit) {
    chekDates(habit);
    if (err) {
      console.log('error in fetching habist form db', err);
      return res.redirect('back');
    }
    return res.render('week', {
      title: 'Weekly View',
      habitList: habit,
    });
  });
};

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

const chekDates = function (habits) {
  let currentDate = new Date().getDate();
  for (let h of habits) {
    const id = h.id;
    const difference = currentDate - h.TodaysDate;
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
    }
  }
};

const calculateStreak = async function (habit) {
  try {
    let noOfCompletedDays = 0;
    let currentStrek = 0;
    let streak = 0;
    for (let i = 0; i < habit.Days.length; i++) {
      if (habit.Days[i] == 'Completed') {
        noOfCompletedDays++;
        currentStrek++;
      } else {
        if (currentStrek > streak) {
          streak = currentStrek;
          currentStrek = 0;
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
