/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { SemesterRegistrationStatusReadOnly } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  //check is there any registered semester that is  already "Upcoming/Ongoing"
  //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  const isThereAnyUpcomingOrOngoingSEmester =
    await SemesterRegistration.findOne({
      $or: [
        { status: SemesterRegistrationStatusReadOnly.UPCOMING },
        { status: SemesterRegistrationStatusReadOnly.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSEmester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is aready an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`
    );
  }

  //checking if the semester is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered!'
    );
  }

  const isAcademicSemesterExists = await AcademicSemester.findById(
    academicSemester
  );
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found!'
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find(query).populate('academicSemester'),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  const meta = await semesterRegistrationQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  //check if the  requested semester registered exists
  //checking if the semester is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, 'This semester is not found!');
  }

  // if the requested semester registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedStatus = payload?.status;
  if (currentSemesterStatus === SemesterRegistrationStatusReadOnly.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`
    );
  }

  //upcoming--> ongoing--> ended

  if (
    currentSemesterStatus === SemesterRegistrationStatusReadOnly.UPCOMING &&
    requestedStatus === SemesterRegistrationStatusReadOnly.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not direclty change status from ${currentSemesterStatus} to ${requestedStatus}`
    );
  }
  if (
    currentSemesterStatus === SemesterRegistrationStatusReadOnly.ONGOING &&
    requestedStatus === SemesterRegistrationStatusReadOnly.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not direclty change status from ${currentSemesterStatus} to ${requestedStatus}`
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This registered semester is not found !'
    );
  }

  // checking if the status is still "UPCOMING"
  const semesterRegistrationStatus = isSemesterRegistrationExists.status;

  if (semesterRegistrationStatus !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update as the registered semester is ${semesterRegistrationStatus}`
    );
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedOfferedCourse = await OfferedCourse.deleteMany(
      {
        semesterRegistration: id,
      },
      {
        session,
      }
    );

    if (!deletedOfferedCourse) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !'
      );
    }

    const deletedSemisterRegistration =
      await SemesterRegistration.findByIdAndDelete(id, {
        session,
        new: true,
      });

    if (!deletedSemisterRegistration) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !'
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return null;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
