import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createAdminValidationSchema } from '../Admin/admin.validation';
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
router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  userControllers.createAdmin
);

export const userRoutes = router;
