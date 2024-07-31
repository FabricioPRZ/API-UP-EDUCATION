import { Router } from "express";
import { getAllCertificates, getCertificateById, updateCertificate, createCertificate, deleteCertificate, deleteLogicalCertificate } from "../controllers/certificateController";
import { authMiddleware } from "../../shared/middlewares/auth";

const certificateRoutes: Router = Router();

certificateRoutes.get('/', authMiddleware, getAllCertificates);
certificateRoutes.get('/:id', authMiddleware, getCertificateById);
certificateRoutes.put('/:id', authMiddleware, updateCertificate);
certificateRoutes.post('/', createCertificate);
certificateRoutes.put('/deleted/:id/', authMiddleware, deleteLogicalCertificate);
certificateRoutes.delete('/:id', authMiddleware, deleteCertificate);

export default certificateRoutes;
