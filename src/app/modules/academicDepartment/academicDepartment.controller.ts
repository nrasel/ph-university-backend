import catchAsync from '../../utility/catchAsync';
import sendResponse from '../../utility/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic department is created successfully',
    data: result,
  });
});
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentService.getAllAcademicDepartmentsFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic department reterived successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(
      departmentId
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic facdepartmentulty reterived successfully',
    data: result,
  });
});
const updateAcademicDepartments = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  const result = await AcademicDepartmentService.updateAcademicDepartmentIntoDB(
    departmentId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic department updated successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartments,
};
