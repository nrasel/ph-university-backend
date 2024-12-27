import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';
const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidation
  ),
  SemesterRegistrationController.createSemesterRegistration
);

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin),
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidation
  ),
  SemesterRegistrationController.updateSemesterRegistration
);


//eita thik korte hobe
// router.delete(
//   '/:id',
//   validateRequest(
//     SemesterRegistrationValidations.updateSemesterRegistrationValidation
//   ),
//   SemesterRegistrationController.updateSemesterRegistration
// );

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

export const semesterRegistrationRoutes = router;
