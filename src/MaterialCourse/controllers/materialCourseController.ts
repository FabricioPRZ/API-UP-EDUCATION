import { Request, Response } from 'express';
import { MaterialCourseService } from '../services/materialCourseService'; 


export const getAllMaterialCourses = async (_req: Request, res: Response) => {
    try {
        const materialCourses = await MaterialCourseService.getAllMaterialCourses();
        if (materialCourses) {
            res.status(200).json(materialCourses);
        } else {
            res.status(404).json({ message: 'No material courses found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getMaterialCourseById = async (req: Request, res: Response) => {
    try {
        const materialCourseId = parseInt(req.params.id, 10);
        const materialCourse = await MaterialCourseService.getMaterialCourseById(materialCourseId);
        if (materialCourse) {
            res.status(200).json(materialCourse);
        } else {
            res.status(404).json({ message: 'Material course not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createMaterialCourse = async (req: Request, res: Response) => {
    try {
        const newMaterialCourse = await MaterialCourseService.addMaterialCourse(req.body);
        if (newMaterialCourse) {
            res.status(201).json(newMaterialCourse);
        } else {
            res.status(400).json({ message: 'Material course creation failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMaterialCourse = async (req: Request, res: Response) => {
    try {
        const materialCourseId = parseInt(req.params.id, 10);
        const updatedMaterialCourse = await MaterialCourseService.modifyMaterialCourse(materialCourseId, req.body);
        if (updatedMaterialCourse) {
            res.status(200).json(updatedMaterialCourse);
        } else {
            res.status(404).json({ message: 'Material course not found or update failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteMaterialCourse = async (req: Request, res: Response) => {
    try {
        const materialCourseId = parseInt(req.params.id, 10);
        const deleted = await MaterialCourseService.deleteMaterialCourse(materialCourseId);
        if (deleted) {
            res.status(200).json({ message: 'Material course deleted successfully' });
        } else {
            res.status(404).json({ message: 'Material course not found or deletion failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalMaterialCourse = async (req: Request, res: Response) => {
    try {
        const materialCourseId = parseInt(req.params.id, 10);
        const success = await MaterialCourseService.deleteMaterialCourseLogic(materialCourseId);
        if (success) {
            res.status(200).json({ message: 'Material course logically deleted successfully' });
        } else {
            res.status(404).json({ message: 'Material course not found or already logically deleted' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
