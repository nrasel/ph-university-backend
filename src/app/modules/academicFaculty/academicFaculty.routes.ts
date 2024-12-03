import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/create-academic-faculty',
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
router.get('/', AcademicFacultyController.getAllAcademicFaculties);

export const AcademicFacultiesRoutes = router;
