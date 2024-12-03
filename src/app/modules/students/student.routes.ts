import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { studentValidations } from './student.validation';

const router = express.Router();

//wil call controller function
router.get('/get-all-student', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentController.updateStudent
);
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;
