import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidation } from './course.validation';
const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse
);
router.get('/:courseId', CourseControllers.getSingleCourses);
router.patch(
  '/:courseId',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse
);
router.get('/', CourseControllers.getAllCourses);
router.delete('/:courseId', CourseControllers.deleteCourses);

export const CourseRoutes = router;
