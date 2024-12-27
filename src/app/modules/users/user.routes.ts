import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utility/sendImageToCloudinary';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import { createFacultyValidationSchema } from '../Faculty/facultyValidation';
import { studentValidations } from '../students/student.validation';
import { USER_ROLE } from './user.constant';
import { userControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    // this also middleware
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.CreateStudentValidationSchema),
  userControllers.createStudent
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    // this also middleware
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createFacultyValidationSchema),
  userControllers.createFaculty
);
router.post(
  '/create-admin',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    // this also middleware
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createAdminValidationSchema),
  userControllers.createAdmin
);
router.post(
  '/change-status/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  userControllers.changeStatus
);

router.get(
  '/me',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  userControllers.getMe
);

export const userRoutes = router;
