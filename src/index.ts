import express, { Application } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './User/routes/userRoutes';
import examRoutes from './Exam/routes/examRoutes';
import courseRoutes from './Course/routes/CourseRoutes';
import lessonRoutes from './Lesson/routes/LessonRoutes';
import materialCourseRoutes from './MaterialCourse/routes/MaterialCourseRoutes';
import progressRoutes from './Progress/routes/ProgressRoutes';
import qualificationRoutes from './Qualification/routes/QualificationRoutes';
import roleRoutes from './Role/routes/RoleRoutes';
import certificateRoutes from './Certificate/routes/certificateRoutes';
import { errorHandler } from './shared/middlewares/errorHandlers';
import { notFoundHandler } from './shared/middlewares/notFoundHandlers';
import path from 'path';

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

// Habilitar CORS
app.use(cors());

app.use(express.static(path.join(__dirname, '../uploads')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/Course', courseRoutes);
app.use('/api/Lesson', lessonRoutes);
app.use('/api/MaterialCourse', materialCourseRoutes);
app.use('/api/Progress', progressRoutes);
app.use('/api/Qualification', qualificationRoutes);
app.use('/api/Role', roleRoutes);
app.use('/api/Certificate', certificateRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
