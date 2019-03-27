const router = require('express').Router();

const reminder_controller = require('../controllers/reportMailer')


router.post('/sendReportCard', reminder_controller.sendReportCard)



module.exports = router;