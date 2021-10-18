mysql=require("mysql")
//export mysql connection
module.exports = {
    db: mysql.createConnection({
        host: `localhost`,
        user: 'root',
        password: 'abc',
        database: 'node',
        port: `3306`,
        charset: 'utf8mb4',
    },(err,res)=>{
        if (err){
            consolge.log(err+"error")
        }
        else{
        console.log("sucess")
        }
    }),

}
