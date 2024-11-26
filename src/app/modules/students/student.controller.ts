import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utility/sendResponse';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.validation';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    // res.status(200).json({
    //   success: true,
    //   message: 'Students are reterived successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student is created successfuly',
      data: result,
    });
    
  } catch (error) {
    next(error);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.getSingleStudentsFromDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student is created successfuly',
      data: result,
    });

  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.deleteStudentFromDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student is created successfuly',
      data: result,
    });

  } catch (error) {
    next(error);
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
