app=require("express");
const {db}=require("./conn.js")
require("ejs");
server=app();
//Set View Engine To EJS
server.set("view engine", "ejs");
//Set Static Directory
const bodyParser= require('body-parser');
server.use(bodyParser.urlencoded({extended:true}))
server.use(app.static(__dirname));

server.post("/submit",(req,res)=>{
    sno = req.body.sno
    Name= req.body.name
    phone=req.body.phone
    email= req.body.email
    course =req.body.course
    db.query(`insert into students (sno,name,phone,email,course) values('${sno}','${Name}','${phone}','${email},'${course}'})`,(err,result)=>{
        if(err)
            console.log(err)

    });
    res.send("data inserted")
});

server.get('/viewdata', function(req, res) { 
    db.query('select * from users',(err,result)=>{
         res.render("displayall",{'userdetails':result})
     });
 
    });
server.listen(
    3000
);