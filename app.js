const express = require('express');
const app = express();
//const mysql = require('mysql');
require('dotenv').config();
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/list-app"

//setting view engine to ejs
app.set('view engine','ejs');


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err)=>{
    if (err) throw err;
    console.log('connected!');
});

const nameSchema = new mongoose.Schema({
    fname: String,
    lname: String
});

const Names = mongoose.model("Names", nameSchema);

 Names.create({fname:'KATENDE',lname:'DAVIS'}).then(console.log('student added'));


/*
//db connection
const db = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD
});


db.connect((err)=>{
if (err) throw err;
console.log('connected');
});

*/



//const students = [{fname:'Katende',lname:'Davis'},{fname:'Mawanda',lname:'Timo'},{fname:'Baingana',lname:'Joshua'}];


app.get('/',(req,res)=>{
    async function findStudent(){

        let results =  await Names.find();
        
        console.log(results);
        res.render('top',{title:'List-app',students:results});
    
    
    
    }
     findStudent();
    /*
   
    db.query('select * from  `List-app`.students',(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.render('top',{title:'List-app',students:result});

    });
    */
   
});




app.get('/new',(req,res)=>{
    res.render('new');

});



app.post('/new',(req,res)=>{
const firstname = req.body.fname;
const lastname = req.body.lname;
db.query('insert into `List-app`.students (fname,lname) values(?,?)',[firstname,lastname],(err,result)=>{
if (err) throw err;
res.redirect('/');
});
});





app.get('/edit/:id',(req,res)=>{
    db.query('select * from `List-app`.students where id=?',[req.params.id],(err,results)=>{
        if(err) throw err;
        res.render('edit',{data:results[0]});

    });

});


app.post('/edit/:id',(req,res)=>{

    db.query('update `List-app`.students set fname = ? , lname = ? where id = ?',[req.body.fname ,req.body.lname,req.params.id],(err,results)=>{
        if (err) throw err;
        console.log(results);
        res.redirect('/');

    });

});



app.post('/delete/:id',(req,res)=>{
    db.query('delete from `List-app`.students where id = ?',[req.params.id],(err,results)=>{
        if(err) throw err;
        res.redirect('/');

    });




});






app.listen(3000);