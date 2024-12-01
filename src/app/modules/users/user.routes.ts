import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from '../students/student.validation';
import { userControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.CreateStudentValidationSchema),
  userControllers.createStudent
);

export const userRoutes = router;
