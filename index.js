//initial setup
const express=require('express');
const app=express();
const port=8000;

//acquering database
const db=require('./config/mongoose');

//seting up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//set up folder for static files
app.use(express.static('assets'));

app.use(express.urlencoded());

//aquiring routes
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error is running the server: ${err}`)
    }
    console.log(`Server is running on port : ${port}`);
})