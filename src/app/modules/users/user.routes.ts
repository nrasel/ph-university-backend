import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../Faculty/facultyValidation';
import { studentValidations } from '../students/student.validation';
import { userControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.CreateStudentValidationSchema),
  userControllers.createStudent
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  userControllers.createFaculty
);

export const userRoutes = router;
