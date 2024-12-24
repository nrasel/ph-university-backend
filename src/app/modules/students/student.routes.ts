import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../users/user.constant';
import { StudentController } from './student.controller';
import { studentValidations } from './student.validation';

const router = express.Router();

//wil call controller function
router.get('/', StudentController.getAllStudents);
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  StudentController.getSingleStudent
);
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentController.updateStudent
);
router.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
