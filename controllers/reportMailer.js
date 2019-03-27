const db = require('../models/dbcon');
const mailer = require('../middleware/mailer');
const syncLoop = require('sync-loop');
const event = require('../middleware/logger.js')
//const jwt= require('jsonwetoken');

//To send report card on email
exports.sendReportCard=(req,res)=>{
    var inputParams=req.body;
    var obj;
    var myQuery="select * from master_school where email='"+inputParams.username+"' or username='"+inputParams.username+"'";
    db.query(myQuery,function(err,result,fields){
       
        if(err)
        {
            event.log('Error while Sending report card' + JSON.stringify(err));
            res.jsonp(err);
        }
        else{
        
            if(result[0]!=null){
               var data=inputParams.data
               
                syncLoop(data.length,function(loop){
                    var i=loop.iteration();
                    
                    var myQuery1="SELECT * from student where fees_status='pending' and email_id='"+data[i].email_id+"' and list_id='"+data[i].list_id+"' and id='"+data[i].id+"' ";
                    db.query(myQuery1,async function(err,result1,fields){
                       
                        if(err)
                        {
                           
                            res.jsonp(err);
                            loop.next();
                        }
                        else{
                         
                            if(result1[0]!=null){
                                await mailer.sendMail(result1).then(function (result3) {
                                     console.log("result3", result3)
                                   //  if(result3.success!=undefined){
                                var myQuery2="insert into reminder_history (stud_id,parent_email_id,admin_id) values('"+result1[0].id+"','"+result1[0].email_id+"','"+result[0].id+"')";
                            db.query(myQuery2,function(err,result2,fields){
    if(err){
        res.jsonp(err);
        loop.next();
    }
    else{
        loop.next();
    }
                            })    
                                    // } else{
                                    //     var obj = {
                                    //         "success": false,
                                    //         "message": "Something went wrong while sending mail"
                                
                                    //     }
                                    //     res.end(JSON.stringify(obj));
                                    //     loop.next();
                                    // } 
                                  })
                               
                            }
                            else{
                                var obj = {
                                    "success": true,
                                    "message": "Record not found"
                        
                                }
                                res.end(JSON.stringify(obj));
                                loop.next();
                            }
                        }
                    })
                  //  loop.next();
                },function(done){
                    var obj = {
                        "success": true,
                        "message": "Mail sent successfully"
            
                    }
                    res.end(JSON.stringify(obj));
                }
                )
    
            }
            else{
                obj={
                    "success":false,
                    "message":"username or email doesn't exist"
                }
                res.end(JSON.stringify(obj));
            }
        }
    })
    
    }


