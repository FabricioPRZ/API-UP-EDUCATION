import { Router } from "express";
import { getAllProgresses, getProgressById, updateProgress, createProgress, deleteProgress, deleteLogicalProgress } from "../controllers/progressController";
import { authMiddleware } from "../../shared/middlewares/auth";

const progressRoutes: Router = Router();

progressRoutes.get('/', authMiddleware, getAllProgresses);
progressRoutes.get('/:id', authMiddleware, getProgressById);
progressRoutes.put('/:id', authMiddleware, updateProgress);
progressRoutes.post('/', createProgress);
progressRoutes.put('/deleted/:id/', authMiddleware, deleteLogicalProgress);
progressRoutes.delete('/:id', authMiddleware, deleteProgress);

export default progressRoutes;
