import { Request, Response } from 'express';
import { CourseService } from '../services/courseService';
import { Course } from '../models/course';

export const getAllCourse = async (_: Request, res: Response) => {
    try {
        const modules = await CourseService.getAllCourse();
        res.status(200).json(modules);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving course', error });
    }
};

export const getCourseById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const module = await CourseService.getCourseById(id);
        if (module) {
            res.status(200).json(module);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving course', error });
    }
};

export const createCourse = async (req: Request, res: Response) => {
    try {
        const newCourseData: Partial<Course> = req.body;
        const result = await CourseService.createCourse(newCourseData);
        res.status(201).json({ message: 'Course created', moduleId: result });
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error });
    }
};

export const updateCourse = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const updatedCourseData: Course = req.body;
        const result = await CourseService.modifyCourse(id, updatedCourseData);
        if (result) {
            res.status(200).json({ message: 'Course updated', module: result });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating course', error });
    }
};

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await CourseService.deleteCourse(id);
        res.status(200).json({ message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error });
    }
};

export const deleteLogicalCourse = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await CourseService.deleteCourseLogic(id);
        res.status(200).json({ message: 'Course logically deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error logically deleting course', error });
    }
};