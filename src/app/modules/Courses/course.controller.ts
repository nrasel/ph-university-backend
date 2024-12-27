import httpStatus from 'http-status';
import catchAsync from '../../utility/catchAsync';
import sendResponse from '../../utility/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});
const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course reterived successfully',
    data: result,
  });
});
const getSingleCourses = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(courseId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course reterived successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const result = await CourseServices.updateCourseIntoDB(courseId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is updated succesfully',
    data: result,
  });
});
const deleteCourses = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.deleteCourseFromDB(courseId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.asignFacultiesWithCourseIntoDB(
    courseId,
    faculties
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});
const getFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const result = await CourseServices.getFacultiesWithCourseIntoDB(courseId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.removeFacultiesWithCourseFromDB(
    courseId,
    faculties
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourses,
  deleteCourses,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
  getFacultiesWithCourse,
};
