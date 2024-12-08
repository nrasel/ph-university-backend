import { Router } from 'express';
import { AcademicDepartmentsRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { AcademicFacultiesRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { AdminRoutes } from '../modules/Admin/admin.routes';
import { CourseRoutes } from '../modules/Courses/course.routes';
import { FacultyRoutes } from '../modules/Faculty/faculty.routes';
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
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultiesRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentsRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
