//const router=require('express').Router();
const db = require('../models/dbcon');
const bcrypt = require('bcrypt-nodejs');
const syncLoop = require('sync-loop');
const event = require('../middleware/logger.js')
const upload = require('./upload');
//const jwt= require('jsonwetoken');




//Register a new school Admin
exports.RegisterSchoolAdmin= (req,res) => {
    var inputparams=req.body;
    var obj;
    var myQuery="select * from user_detail where username='"+inputparams.username+"'"
   
    db.query(myQuery,function(err,result,fields){
        if(err)
        {
            event.log('Error while creating school admin' + JSON.stringify(err));
            res.jsonp(err)
        }
        else{
            if(result[0]!=null)
            {
                obj={
                    "success":false,
                    "message":"This username is already Registered with us"
                }
                res.end(JSON.stringify(obj));
            }
            else{
                
                        var pass = bcrypt.hashSync(inputparams.password);
                     
                 var myQuery3="insert into user_details(username,password,email) values('"+inputparams.username+"','"+pass+"','"+inputparams.email+"')";
                 db.query(myQuery3,function(err,result2,fields){
                    if(err){
                        event.log('Error while creating school admin' + JSON.stringify(err));
                        res.jsonp(err)
                    }
                  else  {
if(result2.affectedRows < 1){
    obj={
        "success":false,
        "message":"something went wrong"
    }
    res.end(JSON.stringify(obj));
}else{
    obj={
        "success":true,
        "message":"You are successfully Registered with us"
    }
    res.end(JSON.stringify(obj));
}
                  }
                })  
        
            }
        }
    })
   
};



//To retrive all List detail of students

exports.getAllStudentdetail=(req,res)=>{
    var inputparams=req.body;
    var obj;
    var arr=[];
    var myQuery="select * from student_master";
    db.query(myQuery,function(err,result,fields){
    if(err){
        event.log('Error while getting all student details' + JSON.stringify(err));
    res.jsonp(err);
    }else{
 if(result[0]!=null){
    obj={
        "result":result,
        "success":true,
        "message":"Student List Get Successfully"
    }
    res.end(JSON.stringify(obj));
 }else{
    obj={
        "success":false,
        "message":"No Data Found"
    }
    res.end(JSON.stringify(obj));
 }
     
    }
    })}




    //To retrive Particular  student details

exports.getParticularStudentDetails=(req,res)=>{
    var inputparams=req.params;
    var obj;
    var arr=[];
    var myQuery="select * from student_master where id='"+inputparams.student_id+"' ";
    db.query(myQuery,function(err,result,fields){
    if(err){
        event.log('Error while getting Particular student details' + JSON.stringify(err));
    res.jsonp(err);
    }else{
 if(result[0]!=null){
    obj={
        "result":result,
        "success":true,
        "message":"Student Details Get Successfully"
    }
    res.end(JSON.stringify(obj));
 }else{
    obj={
        "success":false,
        "message":"No Data Found"
    }
    res.end(JSON.stringify(obj));
 }
     
    }
    })}
    





    
    
    //To Add new student
    
    exports.addNewStudent=(req,res)=>{

    var inputParams=req.body;
    var obj;
  //  await upload.profile(inputParams).then(function (result3) {})
    var myQuery="insert into  `student_master` (name,mobile,address,path,email) values('"+inputParams.name+"','"+inputParams.mobile+"','"+inputParams.address+"','"+inputParams.path+"','"+inputParams.email+"')";
    db.query(myQuery,(err,result,fields)=>{
if(err){
    event.log('Error while adding new student' + JSON.stringify(err));
    res.jsonp(err)
}else{
    if(result.affectedRows < 1){
        obj={
            "success":false,
            "message":"something went wrong"
        }
        res.end(JSON.stringify(obj));
    }else{
        obj={
            "success":true,
            "message":"Student Added Successfully"
        }
        res.end(JSON.stringify(obj));
    }

}
    })
    
    }


  //To Delete Particular Student
    
  exports.deleteStudent=(req,res)=>{
    var inputParams=req.params;
    var obj;
    var myQuery="delete from `student_master` where id='"+inputParams.student_id+"'";
    db.query(myQuery,(err,result,fields)=>{
if(err){
    event.log('Error while deleting student' + JSON.stringify(err));
    res.jsonp(err)
}else{
    if(result.affectedRows < 1){
        obj={
            "success":false,
            "message":"something went wrong"
        }
        res.end(JSON.stringify(obj));
    }else{
        obj={
            "success":true,
            "message":"Student deleted Successfully"
        }
        res.end(JSON.stringify(obj));
    }

}
    })
    
    }


//To update Particular Student
    
exports.updateStudent=(req,res)=>{
    var inputParams=req.body;
    var obj;
    var myQuery="update `student_master` set name='"+inputParams.name+"' ,mobile='"+inputParams.mobile+"',address='"+inputParams.address+"',email='"+inputParams.email+"' where id='"+inputParams.student_id+"'";
    db.query(myQuery,(err,result,fields)=>{
if(err){
    event.log('Error while updating student details' + JSON.stringify(err));
    res.jsonp(err)
}else{
    if(result.affectedRows < 1){
        obj={
            "success":false,
            "message":"Something Went Wrong"
        }
        res.end(JSON.stringify(obj));
    }else{
        obj={
            "success":true,
            "message":"Student Updated Successfully"
        }
        res.end(JSON.stringify(obj));
    }

}
    })
    
    }



    

   


//module.exports=router