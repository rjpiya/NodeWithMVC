const db = require('../models/dbcon');
const syncLoop = require('sync-loop');
const event = require('../middleware/logger.js')
//const jwt= require('jsonwetoken');

//To retrive  List of Subjects

exports.getSubjectList=(req,res)=>{
    var obj;
    var arr=[];
    var myQuery="select * from subject ";
    db.query(myQuery,function(err,result,fields){
    if(err){
        event.log('Error while getting subject list' + JSON.stringify(err));
    res.jsonp(err);
    }else{
 if(result[0]!=null){
    obj={
        "result":result,
        "success":true,
        "message":"Subject List Get Successfully"
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



    //Add student Marks

    exports.addStudentMarks=(req,res)=>{
        var inputParams=req.body;
        var obj;

        syncLoop(inputParams.data.length,function(loop){
            var i=loop.iteration();

        var myQuery="insert into `marks_details` (stud_id,marks,sub_id) values('"+inputParams.stud_id+"','"+inputParams.data[i].marks+"','"+inputParams.data[i].sub_id+"')";
        db.query(myQuery,(err,result,fields)=>{
    if(err){
        event.log('Error while adding student marks' + JSON.stringify(err));
        res.jsonp(err)
        loop.next();
    }else{
        if(result.affectedRows < 1){
            obj={
                "success":false,
                "message":"Something Went Wrong"
            }
            res.end(JSON.stringify(obj));
            loop.next();
        }else{
            obj={
                "success":true,
                "message":"Student Marks Added Successfully"
            }
            res.end(JSON.stringify(obj));
            loop.next();
        }
    
    }
        })
    },function(done){
        var obj = {
            "success": true,
            "message": "Student Marks Added Successfully"

        }
        res.end(JSON.stringify(obj));
    }
    )
        }


        //Get report card of particular student
        exports.getReportCard=(req,res)=>{
            var inputparams=req.params;
            var obj;
            var arr=[];
            var myQuery="SELECT * FROM `student_master` where id='"+inputparams.student_id+"' ";
            db.query(myQuery,function(err,result,fields){
            if(err){
                event.log('Error while getting student report card' + JSON.stringify(err));
            res.jsonp(err);
            }else{
         if(result[0]!=null){
           var myQuery1="SELECT * FROM `marks_details` where stud_id='"+inputparams.student_id+"' ";
           db.query(myQuery1,async function (err,result1,fields){
               if(err){
                event.log('Error while getting student report card' + JSON.stringify(err));
                   res.jsonp(err)
                  
               }
               else{


                await getReportCardData(result1).then(function (arr) {

                    console.log(arr,"arr")
                    obj={
                        "result":arr,
                        "student_details":result[0],
                        "success":true,
                         "message":"Report Card Get Successfully"
                        }
                                res.end(JSON.stringify(obj));
                                
                })
               
               }
           })
         }else{
            obj={
                "success":false,
                "message":"No Data Found"
            }
            res.end(JSON.stringify(obj));
         }
             
            }
            })}



            
    function getReportCardData(result1) {
        var arr=[];
        
        return new Promise(function (resolve, reject) {

            syncLoop(result1.length,function(loop){
                var i=loop.iteration();
           var myQuery2="SELECT * FROM `subject` where id='"+result1[i].sub_id+"' ";
                db.query(myQuery2,(err,result2,fields)=>{
                    if(err){
                        event.log('Error while getting student report card' + JSON.stringify(err));
                        res.jsonp(err)
               loop.next();
                    }
                    else{
                        var obj1={
                            "marks":result1[i].marks,
                            "subject":result2[0].name}
                      
                       arr.push(obj1)
                     
                     
                       loop.next();
                    }})

            },function(done){
                console.log(arr,"arr");
                resolve(arr);
               // res.end(JSON.stringify(arr));
               
            }
            )
           
           
                //resolve(arr);
            })
    }