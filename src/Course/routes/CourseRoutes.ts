import { Router } from 'express';
import { getAllCourse, getCourseById, createCourse, updateCourse, deleteCourse, deleteLogicalCourse } from '../controllers/courseControllers';

const courseRoutes = Router();

// Rutas de módulos
courseRoutes.get('/course', getAllCourse);
courseRoutes.get('/course/:id', getCourseById);
courseRoutes.post('/', createCourse);
courseRoutes.put('/course/:id', updateCourse);
courseRoutes.delete('/course/:id', deleteCourse);
courseRoutes.patch('/course/:id', deleteLogicalCourse);

export default courseRoutes;