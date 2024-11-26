import { Router } from 'express';
import { StudentRoutes } from '../modules/students/student.routes';
import { userRoutes } from '../modules/users/user.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
