import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../Courses/course.model';
import { Faculty } from '../Faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  //check if the semester registration id is exists!

  const isSemesterRegistrationExists = await SemesterRegistration.findById(
    semesterRegistration
  );

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found!'
    );
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const isacadicFacultyExists = await AcademicFaculty.findById(academicFaculty);

  if (!isacadicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found!');
  }

  const isacadicDepartmentExists = await AcademicDepartment.findById(
    academicDepartment
  );

  if (!isacadicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found!');
  }

  const isacadicCourseExists = await Course.findById(course);

  if (!isacadicCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found!');
  }

  const isaFacultyExists = await Faculty.findById(faculty);

  if (!isaFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found!');
  }

  //check is the department is belong to the  faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isacadicDepartmentExists.name} is not belong to  this ${isacadicFacultyExists.name}`
    );
  }

  //check is the same offered course same section in same registered semester exists
  const isSameOfferdCourseExistsWithSameRegisterdSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferdCourseExistsWithSameRegisterdSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist!`
    );
  }

  //get the schedule of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
  //   return null;
};

const getAllOfferedCoursesFromDB = async () => {};

const getSingleOfferedCourseFromDB = async () => {};

const updateOfferedCourseIntoDB = async () => {};

const deleteOfferedCourseFromDB = async () => {};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
