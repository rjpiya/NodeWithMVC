const router = require('express').Router();

const login_controller = require('../controllers/login')

router.post('/checkUserExist', login_controller.validateSchoolAdmin)


module.exports = router;
