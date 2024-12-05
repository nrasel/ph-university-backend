import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation';
const router = express.Router();

router.post(
  '/create-academic-department',
  // validateRequest(
  //   academicDepartmentValidation.createAcademicDepartmentValidationSchema
  // ),
  AcademicDepartmentController.createAcademicDepartment
);
router.get(
  '/:departmentId',
  AcademicDepartmentController.getSingleAcademicDepartment
);
router.patch(
  '/:departmentId',
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentController.updateAcademicDepartments
);
router.get('/', AcademicDepartmentController.getAllAcademicDepartment);

export const AcademicDepartmentsRoutes = router;
