import { Router } from "express";
import { getAllQualifications, getQualificationById, updateQualification, createQualification, deleteQualification, deleteLogicalQualification } from "../controllers/qualificationController";
import { authMiddleware } from "../../shared/middlewares/auth";

const qualificationRoutes: Router = Router();

qualificationRoutes.get('/', authMiddleware, getAllQualifications);
qualificationRoutes.get('/:id', authMiddleware, getQualificationById);
qualificationRoutes.put('/:id', authMiddleware, updateQualification);
qualificationRoutes.post('/', createQualification);
qualificationRoutes.put('/deleted/:id/', authMiddleware, deleteLogicalQualification);
qualificationRoutes.delete('/:id', authMiddleware, deleteQualification);

export default qualificationRoutes;
