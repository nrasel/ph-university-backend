import catchAsync from '../../utility/catchAsync';
import sendResponse from '../../utility/sendResponse';

import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculty is created successfully',
    data: result,
  });
});
const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.getAllAcademicFacultiesFromDB(
    req.query
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculty reterived successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getSingleAcademicFaculties = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyService.getSingleAcademicFacultyFromDB(
    facultyId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculty reterived successfully',
    data: result,
  });
});
const updateAcademicFaculties = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyService.updateAcademicFacultyIntoDB(
    facultyId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculty updated successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getSingleAcademicFaculties,
  getAllAcademicFaculties,
  updateAcademicFaculties,
};
