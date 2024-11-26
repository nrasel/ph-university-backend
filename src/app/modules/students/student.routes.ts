import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

//wil call controller function
router.get('/get-all-student', StudentController.getAllStudents);
router.get('/get-single-student/:id', StudentController.getSingleStudent);
router.delete('/student-delete/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
