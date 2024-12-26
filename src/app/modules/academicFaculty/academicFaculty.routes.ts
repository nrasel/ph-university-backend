import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';
import { USER_ROLE } from '../users/user.constant';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin),
  validateRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyController.createAcademicFaculty
);
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculties);
router.patch(
  '/:facultyId',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyController.updateAcademicFaculties
);
router.get('/', auth(), AcademicFacultyController.getAllAcademicFaculties);

export const AcademicFacultiesRoutes = router;
