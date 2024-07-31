import { Request, Response } from 'express';
import { CertificateService } from '../services/certificateService'; 

export const getAllCertificates = async (_req: Request, res: Response) => {
    try {
        const certificates = await CertificateService.getAllCertificates();
        if (certificates) {
            res.status(200).json(certificates);
        } else {
            res.status(404).json({ message: 'No certificates found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getCertificateById = async (req: Request, res: Response) => {
    try {
        const certificateId = parseInt(req.params.id, 10);
        const certificate = await CertificateService.getCertificateById(certificateId);
        if (certificate) {
            res.status(200).json(certificate);
        } else {
            res.status(404).json({ message: 'Certificate not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createCertificate = async (req: Request, res: Response) => {
    try {
        const newCertificate = await CertificateService.addCertificate(req.body);
        if (newCertificate) {
            res.status(201).json(newCertificate);
        } else {
            res.status(400).json({ message: 'Certificate creation failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCertificate = async (req: Request, res: Response) => {
    try {
        const certificateId = parseInt(req.params.id, 10);
        const updatedCertificate = await CertificateService.modifyCertificate(certificateId, req.body);
        if (updatedCertificate) {
            res.status(200).json(updatedCertificate);
        } else {
            res.status(404).json({ message: 'Certificate not found or update failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCertificate = async (req: Request, res: Response) => {
    try {
        const certificateId = parseInt(req.params.id, 10);
        const deleted = await CertificateService.deleteCertificate(certificateId);
        if (deleted) {
            res.status(200).json({ message: 'Certificate deleted successfully' });
        } else {
            res.status(404).json({ message: 'Certificate not found or deletion failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalCertificate = async (req: Request, res: Response) => {
    try {
        const certificateId = parseInt(req.params.id, 10);
        const success = await CertificateService.deleteCertificateLogic(certificateId);
        if (success) {
            res.status(200).json({ message: 'Certificate logically deleted successfully' });
        } else {
            res.status(404).json({ message: 'Certificate not found or already logically deleted' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
