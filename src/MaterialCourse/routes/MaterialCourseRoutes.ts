import { Router } from "express";
import { getAllMaterialCourses, getMaterialCourseById, updateMaterialCourse, createMaterialCourse, deleteMaterialCourse, deleteLogicalMaterialCourse } from "../controllers/materialCourseController";
import { authMiddleware } from "../../shared/middlewares/auth";

const materialCourseRoutes: Router = Router();

materialCourseRoutes.get('/', authMiddleware, getAllMaterialCourses);
materialCourseRoutes.get('/:id', authMiddleware, getMaterialCourseById);
materialCourseRoutes.put('/:id', authMiddleware, updateMaterialCourse);
materialCourseRoutes.post('/', createMaterialCourse);
materialCourseRoutes.put('/deleted/:id/', authMiddleware, deleteLogicalMaterialCourse);
materialCourseRoutes.delete('/:id', authMiddleware, deleteMaterialCourse);

export default materialCourseRoutes;
