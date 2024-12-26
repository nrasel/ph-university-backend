import catchAsync from '../../utility/catchAsync';
import sendResponse from '../../utility/sendResponse';
import { UserServices } from './user.service';

const createStudent = catchAsync(async (req, res) => {
 const { password, student: studentData } = req.body;
  // console.log(req.file);


   const result = await UserServices.createStudentIntoDB(req.file,password, studentData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is created successfuly',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(req.file,password, facultyData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(
    req.file,
    password,
    adminData
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await UserServices.getMeFromDB(userId, role);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `User is reterived successfully`,
    data: result,
  });
});
const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Status is updated successfully`,
    data: result,
  });
});

export const userControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
