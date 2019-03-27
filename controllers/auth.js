const jwt= require('jsonwebtoken');
const config=require('../middleware/config');
const login=require('./login');
const event = require('../middleware/logger.js')

module.exports =  function (req, res, next) {
    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe.
    // We skip the token outh for [OPTIONS] requests.
    //if(req.method == 'OPTIONS') next();
    var token = req.headers['access-token'];
 
    if (token ) {
        try {
            jwt.verify(token, config.secret, async function (err, decoded) {
                if (err) {
                    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                }
            
                else {
                    console.log(decoded,"decodeeeeeeeeeeeee")
                    // No user with this name exists, respond back with a 401
                   next();
                }
            });
 
 
 
        } catch (err) {
            res.status(500);
            res.json({
                "status": 500,
                "message": "Oops something went wrong",
                "error": err
            });
        }
    } else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid Token or Key"
        });
        return;
    }
 };
 
 