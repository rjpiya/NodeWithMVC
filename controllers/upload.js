const router = require('express').Router();
//const jwt= require('jsonwetoken');
//console.log( __dirname+'\\uploads\\');
const multer  = require('multer')

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname+'\\uploads\\');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
    /*filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }*/
 });
 
 var upload = multer({
    storage: Storage
 }).fields([{
    name: 'file1'

 }])



 var upload_img={
    profile:function(imgObj) {
    
        return new Promise(function (resolve, reject) {
//router.post('/profile', function (req, res) {
  
    upload(req, res, function (err) {
        var logo=req.files.file1[0].filename
        console.log(req.files.file1[0].filename);
        if (err) {
            console.log('Error',err);
          // A Multer error occurred when uploading.
        } else{
            resolve(logo)
          // An unknown error occurred when uploading.
        }
     
        // Everything went fine.
      })
 // })
 })
//})
}
}


module.exports=upload_img