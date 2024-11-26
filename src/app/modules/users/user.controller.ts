import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utility/sendResponse';
import { UserServices } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

    // res.status(200).json({
    //   success: true,
    //   message: 'Student is created successfuly',
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

export const userControllers = {
  createStudent,
};
