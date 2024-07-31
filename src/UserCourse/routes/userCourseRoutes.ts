import { Router } from "express";
import { getAllUserCourses, getUserCourseById, createUserCourse, deleteUserCourse } from "../controllers/userCourseController";
import { authMiddleware } from "../../shared/middlewares/auth";

const userCourseRoutes: Router = Router();

userCourseRoutes.get('/', authMiddleware, getAllUserCourses);
userCourseRoutes.get('/:userId/:courseId', authMiddleware, getUserCourseById);
userCourseRoutes.post('/', authMiddleware, createUserCourse);
userCourseRoutes.delete('/:userId/:courseId', authMiddleware, deleteUserCourse);

export default userCourseRoutes;
