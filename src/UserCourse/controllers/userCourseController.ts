import { Request, Response } from 'express';
import { UserCourseService } from '../services/userCourseService';

export const getAllUserCourses = async (_req: Request, res: Response) => {
    try {
        const userCourses = await UserCourseService.getAllUserCourses();
        if (userCourses) {
            res.status(200).json(userCourses);
        } else {
            res.status(404).json({ message: 'No user courses found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserCourseById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const courseId = parseInt(req.params.courseId, 10);
        const userCourse = await UserCourseService.getUserCourseById(userId, courseId);
        if (userCourse) {
            res.status(200).json(userCourse);
        } else {
            res.status(404).json({ message: 'User course not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createUserCourse = async (req: Request, res: Response) => {
    try {
        const newUserCourse = await UserCourseService.addUserCourse(req.body);
        if (newUserCourse) {
            res.status(201).json(newUserCourse);
        } else {
            res.status(400).json({ message: 'User course creation failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUserCourse = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const courseId = parseInt(req.params.courseId, 10);
        const deleted = await UserCourseService.removeUserCourse(userId, courseId);
        if (deleted) {
            res.status(200).json({ message: 'User course deleted successfully' });
        } else {
            res.status(404).json({ message: 'User course not found or deletion failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
