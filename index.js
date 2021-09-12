const express=require('express');
const app=express();
const port=8000;

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error is running the server: ${err}`)
    }
    console.log(`Server is running on port : ${port}`);
})