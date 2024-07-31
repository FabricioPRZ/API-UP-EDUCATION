import { Request, Response } from 'express';
import { examService } from '../services/examService'; 

export const getAllExams = async (_req: Request, res: Response) => {
    try {
        const exams = await examService.getAllExams();
        if (exams) {
            res.status(200).json(exams);
        } else {
            res.status(404).json({ message: 'No exams found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getExamById = async (req: Request, res: Response) => {
    try {
        const examId = parseInt(req.params.id, 10);
        const exam = await examService.getExamById(examId);
        if (exam) {
            res.status(200).json(exam);
        } else {
            res.status(404).json({ message: 'Exam not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createExam = async (req: Request, res: Response) => {
    try {
        const newExam = await examService.addExam(req.body);
        if (newExam) {
            res.status(201).json(newExam);
        } else {
            res.status(400).json({ message: 'Exam creation failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateExam = async (req: Request, res: Response) => {
    try {
        const examId = parseInt(req.params.id, 10);
        const updatedExam = await examService.modifyExam(examId, req.body);
        if (updatedExam) {
            res.status(200).json(updatedExam);
        } else {
            res.status(404).json({ message: 'Exam not found or update failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteExam = async (req: Request, res: Response) => {
    try {
        const examId = parseInt(req.params.id, 10);
        const deleted = await examService.deleteExam(examId);
        if (deleted) {
            res.status(200).json({ message: 'Exam deleted successfully' });
        } else {
            res.status(404).json({ message: 'Exam not found or deletion failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalExam = async (req: Request, res: Response) => {
    try {
        const examId = parseInt(req.params.id, 10);
        const success = await examService.deleteExamLogic(examId);
        if (success) {
            res.status(200).json({ message: 'Exam logically deleted successfully' });
        } else {
            res.status(404).json({ message: 'Exam not found or already logically deleted' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
