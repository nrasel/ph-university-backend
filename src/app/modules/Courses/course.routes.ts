import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../users/user.constant';
import { CourseControllers } from './course.controller';
import { CourseValidation } from './course.validation';
const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse
);
router.get(
  '/:courseId',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  CourseControllers.getSingleCourses
);
router.patch(
  '/:courseId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse
);

router.delete(
  '/:courseId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CourseControllers.deleteCourses
);

router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse
);

router.get(
  '/:courseId/get-faculties',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseControllers.getFacultiesWithCourse
);

router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse
);

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  CourseControllers.getAllCourses
);

export const CourseRoutes = router;
