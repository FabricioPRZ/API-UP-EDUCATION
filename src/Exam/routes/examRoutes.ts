import { Router } from "express";
import { getAllExams, getExamById, updateExam, createExam, deleteExam, deleteLogicalExam } from "../controllers/examController";
import { authMiddleware } from "../../shared/middlewares/auth";

const examRoutes: Router = Router();


examRoutes.get('/', authMiddleware, getAllExams);
examRoutes.get('/:id', authMiddleware, getExamById);
examRoutes.put('/:id', authMiddleware, updateExam);
examRoutes.post('/', createExam);
examRoutes.put('/deleted/:id/', authMiddleware, deleteLogicalExam);
examRoutes.delete('/:id', authMiddleware, deleteExam);

export default examRoutes;
