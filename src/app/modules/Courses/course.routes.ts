import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../users/user.constant';
import { CourseControllers } from './course.controller';
import { CourseValidation } from './course.validation';
const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse
);
router.get(
  '/:courseId',
  auth('student', 'faculty', 'admin'),
  CourseControllers.getSingleCourses
);
router.patch(
  '/:courseId',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse
);

router.delete('/:courseId', auth('admin'), CourseControllers.deleteCourses);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse
);

router.delete(
  '/:courseId/remove-faculties',
  auth('admin'),
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse
);

router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;
