const router = require('express').Router();

const school_controller = require('../controllers/school')

router.post('/RegisterSchoolAdmin', school_controller.RegisterSchoolAdmin)
router.get('/getParticularStudentDetails/:student_id', school_controller.getParticularStudentDetails)
router.get('/getAllStudentdetail', school_controller.getAllStudentdetail)
router.post('/addNewStudent', school_controller.addNewStudent)
router.get('/deleteStudent/:student_id', school_controller.deleteStudent)
router.post('/updateStudent', school_controller.updateStudent)


module.exports = router;
