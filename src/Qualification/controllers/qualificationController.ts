import { Request, Response } from 'express';
import { QualificationService } from '../services/qualificationService';

export const getAllQualifications = async (_req: Request, res: Response) => {
    try {
        const qualifications = await QualificationService.getAllQualifications();
        if (qualifications) {
            res.status(200).json(qualifications);
        } else {
            res.status(404).json({ message: 'No qualifications found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getQualificationById = async (req: Request, res: Response) => {
    try {
        const qualificationId = parseInt(req.params.id, 10);
        const qualification = await QualificationService.getQualificationById(qualificationId);
        if (qualification) {
            res.status(200).json(qualification);
        } else {
            res.status(404).json({ message: 'Qualification not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createQualification = async (req: Request, res: Response) => {
    try {
        const newQualification = await QualificationService.addQualification(req.body);
        if (newQualification) {
            res.status(201).json(newQualification);
        } else {
            res.status(400).json({ message: 'Qualification creation failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateQualification = async (req: Request, res: Response) => {
    try {
        const qualificationId = parseInt(req.params.id, 10);
        const updatedQualification = await QualificationService.modifyQualification(qualificationId, req.body);
        if (updatedQualification) {
            res.status(200).json(updatedQualification);
        } else {
            res.status(404).json({ message: 'Qualification not found or update failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteQualification = async (req: Request, res: Response) => {
    try {
        const qualificationId = parseInt(req.params.id, 10);
        const deleted = await QualificationService.deleteQualification(qualificationId);
        if (deleted) {
            res.status(200).json({ message: 'Qualification deleted successfully' });
        } else {
            res.status(404).json({ message: 'Qualification not found or deletion failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalQualification = async (req: Request, res: Response) => {
    try {
        const qualificationId = parseInt(req.params.id, 10);
        const success = await QualificationService.deleteQualificationLogic(qualificationId);
        if (success) {
            res.status(200).json({ message: 'Qualification logically deleted successfully' });
        } else {
            res.status(404).json({ message: 'Qualification not found or already logically deleted' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
