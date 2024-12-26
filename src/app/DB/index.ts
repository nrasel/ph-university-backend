import config from '../config';
import { USER_ROLE } from '../modules/users/user.constant';
import { User } from '../modules/users/user.model';

const superUser = {
  id: '0001',
  email: 'naimur37@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: 'superAdmin',
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin });
  if (!isSuperAdminExists) {
    await User.create(superUser);
  }
};
export default seedSuperAdmin;
