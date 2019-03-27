//const nodemailer = require('nodemailer');
const mailer = require('../middleware/mailer');

var testMailer={
     sendMail:function(mailObj) {
    
        return new Promise(function (resolve, reject) {
          
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: '',
                    pass: ''
                }
            });
    
            var mailOptions = {
                from: '',
            
                  to: mailObj[0].email_id,
                subject: 'Report Card',
                text: 'You recently requested to Reset your password for your Check In App Account.Use OTP details as follows:Your OTP is' + mailObj.otp + ' If you did not request a password reset, Please ignore this email.'
    
            };
    
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    reject(error)
                } else {
                    console.log('Email sent: ' + info.response);
                    var obj = {
                        "message": "Mail sent successfully",
                        "success": true
                    }
    
                    resolve(JSON.stringify(obj))
                }
            });
    
        })
    
    }
}



module.exports=testMailer