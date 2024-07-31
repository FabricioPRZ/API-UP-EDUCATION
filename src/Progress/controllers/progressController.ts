import { Request, Response } from 'express';
import { ProgressService } from '../services/progressService'; 


export const getAllProgresses = async (_req: Request, res: Response) => {
    try {
        const progresses = await ProgressService.getAllProgresses();
        if (progresses) {
            res.status(200).json(progresses);
        } else {
            res.status(404).json({ message: 'No progresses found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getProgressById = async (req: Request, res: Response) => {
    try {
        const progressId = parseInt(req.params.id, 10);
        const progress = await  ProgressService.getProgressById(progressId);
        if (progress) {
            res.status(200).json(progress);
        } else {
            res.status(404).json({ message: 'Progress not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createProgress = async (req: Request, res: Response) => {
    try {
        const newProgress = await ProgressService.addProgress(req.body);
        if (newProgress) {
            res.status(201).json(newProgress);
        } else {
            res.status(400).json({ message: 'Progress creation failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProgress = async (req: Request, res: Response) => {
    try {
        const progressId = parseInt(req.params.id, 10);
        const updatedProgress = await ProgressService.modifyProgress(progressId, req.body);
        if (updatedProgress) {
            res.status(200).json(updatedProgress);
        } else {
            res.status(404).json({ message: 'Progress not found or update failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProgress = async (req: Request, res: Response) => {
    try {
        const progressId = parseInt(req.params.id, 10);
        const deleted = await ProgressService.deleteProgress(progressId);
        if (deleted) {
            res.status(200).json({ message: 'Progress deleted successfully' });
        } else {
            res.status(404).json({ message: 'Progress not found or deletion failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalProgress = async (req: Request, res: Response) => {
    try {
        const progressId = parseInt(req.params.id, 10);
        const success = await ProgressService.deleteProgressLogic(progressId);
        if (success) {
            res.status(200).json({ message: 'Progress logically deleted successfully' });
        } else {
            res.status(404).json({ message: 'Progress not found or already logically deleted' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
