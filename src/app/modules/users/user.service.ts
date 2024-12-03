import config from '../../config';

import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './users.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  //set generated id
  userData.id = await generateStudentId(admissionSemester);

  //create a user
  const result = await User.create(userData);

  //create a student
  if (Object.keys(result).length) {
    //set id, _id as user
    payload.id = result.id;
    payload.user = result._id; //reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }

  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
