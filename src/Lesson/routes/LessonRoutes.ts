import { Router } from 'express';
import { getAllLessons, getLessonById, createLesson, updateLesson, deleteLesson, deleteLogicalLesson } from '../controllers/lessonController';
import { authMiddleware } from '../../shared/middlewares/auth';
import upload from '../../shared/middlewares/uploadMiddleware';

const lessonRoutes: Router = Router();

lessonRoutes.get('/', authMiddleware, getAllLessons);
lessonRoutes.get('/:id', authMiddleware, getLessonById);
lessonRoutes.post('/', upload.single('file'), createLesson);
lessonRoutes.put('/:id', upload.single('file'), updateLesson);
lessonRoutes.put('/deleted/:id/', authMiddleware, deleteLogicalLesson);
lessonRoutes.delete('/:id', authMiddleware, deleteLesson);

export default lessonRoutes;
