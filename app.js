const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const bodyparser=require('body-parser');
const app=express();
const loginRoutes = require('./routes/loginUser')
const schoolRoutes=require('./routes/schoolRoute')
const reportMailerRoute=require('./routes/reportMailerRoute')
const marksRoutes=require('./routes/student_marksRoute')
//const jwt = require('jsonwetoken');
const auth = require('./controllers/auth')


app.use(morgan('tiny'));//combined
app.use(cors());
app.use(bodyparser.json({
    limit:'50mb'
}))
app.use(bodyparser.urlencoded({
    extended:true
}))

// routes
//for json web token
//app.all('/school/*', [auth])

app.use('/login', loginRoutes)
app.use('/school', schoolRoutes)
app.use('/reportMailer',reportMailerRoute)
app.use('/marks',marksRoutes)




var port=process.env.PORT || 9000
console.log(port)
app.listen(port,()=>{
    console.log(`server running on port http://localhost:${port}`)
});


module.exports=app;