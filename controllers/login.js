const jwt = require('jsonwebtoken');
//const router = require('express').Router();
const db = require('../models/dbcon');
const bcrypt = require('bcrypt-nodejs');
const config = require('../middleware/config');
const event = require('../middleware/logger.js')

exports.validateSchoolAdmin=(req,res)=>{
   
    var inputParams=req.body;
    var obj;
    var myQuery="select * from user_details where username='"+inputParams.username+"'";
    
    db.query(myQuery,(err,result,fields)=>{

        if(err){
            event.log('Error while login user' + JSON.stringify(err));
res.jsonp(err);
        }
        else{
           
if(result[0]!=null){
    bcrypt.compare(inputParams.password, result[0].password, function (err, res1) {
        if (err) {
            event.log('Error while login user' + JSON.stringify(err));
            res.jsonp(err)
        } else {
          
            if (res1) {
                const payload = {
                    check:  true
                };
                      var token = jwt.sign(payload, config.secret,{
                            expiresIn: 1440 
                      });


                obj={
                    "success":true,
                    "message":"Authorized user",
                    "token": token
                };
               res.end(JSON.stringify(obj)) 
            }
        else{
            obj={
                "success":false,
                "message":"Incorrect Password"
            };
           res.end(JSON.stringify(obj)) 
        }}})

}
else{
obj={
    "message":"This UserName is not registered with us",
    "success":false
}
res.end(obj);
}
        }
    })
}

//module.exports=router
