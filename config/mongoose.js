const mongoose=require('mongoose');
const uri = process.env.HABIT_URI || 'mongodb+srv://avishekv444:hppavalion@habittracker.sevb6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Atlas database ');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

const db=mongoose.connection;

db.on('error',console.error.bind('Error connecting to MongoDB'));

db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports=db;