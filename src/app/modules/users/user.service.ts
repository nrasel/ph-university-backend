import config from '../../config';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password

  userData.password = password || (config.default_password as string);

  userData.role = 'student';

  //manually generated id
  userData.id = '20301000001';

  //create a user
  const result = await User.create(userData);

  //create a student
  if (Object.keys(result).length) {
    //set id, _id as user
    studentData.id = result.id;
    studentData.user = result._id; //reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }

  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
