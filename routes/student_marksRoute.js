const router = require('express').Router();

const student_marksl_controller = require('../controllers/student_marks')

router.post('/addStudentMarks', student_marksl_controller.addStudentMarks)
router.get('/getSubjectList', student_marksl_controller.getSubjectList)
router.get('/getReportCard/:student_id', student_marksl_controller.getReportCard)

module.exports = router;
