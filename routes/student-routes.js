const express = require('express');

const studentControllers = require('../controllers/student-controllers');

const router = express.Router();


router.get('/', studentControllers.getAllStudents);

router.get('/:sid', studentControllers.getStudentById);

router.get('/company/:cName', studentControllers.getStudentsByCompanyName);

router.get('/branch/:bName', studentControllers.getStudentsByBranch);




module.exports = router;
