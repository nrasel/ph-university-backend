import { RequestHandler } from 'express';
import catchAsync from '../../utility/catchAsync';
import sendResponse from '../../utility/sendResponse';
import { StudentServices } from './student.service';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is created successfuly',
    data: result,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.studentId;
  const result = await StudentServices.getSingleStudentsFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is created successfuly',
    data: result,
  });
});

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.studentId;
  const result = await StudentServices.deleteStudentFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student deleted successfuly',
    data: result,
  });
});

const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.studentId;

  const result = await StudentServices.updateStudentFromDB(
    id,
    req.body.student
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student updated successfuly',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
