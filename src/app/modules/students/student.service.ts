/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../users/user.model';
import { studentSearchableField } from './student.constant';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const studentSearchableField = ['email', 'name.firstName', 'presentAddress'];

  // const queryObj = { ...query };
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or: studentSearchableField.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // //Filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludeFields.forEach((elem) => delete queryObj[elem]);

  // const filterQuery = searchQuery
  //   .find(queryObj)
  // .populate('admissionSemester')
  // .populate({
  //   path: 'academicDepartment',
  //   populate: {
  //     path: 'academicFaculty',
  //   },
  // });

  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query?.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query?.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery =  paginateQuery.limit(limit);

  // field limiting
  // let fields = '-__v'; //__v from database and - for descending order
  // if (query?.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }

  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query
  )
    .search(studentSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

    const meta =await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;
  return { meta, result };
};
const getSingleStudentsFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGauardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGauardian && Object.keys(localGauardian).length) {
    for (const [key, value] of Object.entries(localGauardian)) {
      modifiedUpdatedData[`localGauardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};
