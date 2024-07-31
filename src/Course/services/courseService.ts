import { CourseRepository } from "../repositories/CourseRepository";
import { Course } from "../models/course";
import { DateUtils } from "../../shared/utils/DateUtils"; 
import dotenv from 'dotenv';

dotenv.config();

export class CourseService {

    public static async getAllCourse(): Promise<Course[]> {
        try {
            return await CourseRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error getting course: ${error.message}`);
        }
    }

    public static async getCourseById(courseId: number): Promise<Course | null> {
        try {
            return await CourseRepository.findById(courseId);
        } catch (error: any) {
            throw new Error(`Error finding course: ${error.message}`);
        }
    }

    public static async createCourse( courseData: Partial<Course>): Promise<number> {
    
        const course: Course = {
            course_id: courseData.course_id ?? null,
            title: courseData.title || '',
            subject: courseData.subject || '',
            purpose: courseData.purpose || '',
            description: courseData.description || '',
            lessonNumber: courseData.lessonNumber || 0,
            teacher: courseData.teacher || '',
            created_by: courseData.created_by || '',
            created_at: new Date().toISOString().replace('T', ' ').replace('Z', ''),
            updated_by: courseData.updated_by || '',
            updated_at: new Date().toISOString().replace('T', ' ').replace('Z', ''),
            deleted: courseData.deleted ?? false
        };
    
        const createdCourse = await CourseRepository.createCourse(course);
        return createdCourse.course_id ?? 0;
    }

    public static async modifyCourse(courseId: number, courseData: Course) {
        try {
            const courseFound = await CourseRepository.findById(courseId);
            if (courseFound) {
                courseFound.title = courseData.title || courseFound.title;
                courseFound.subject = courseData.subject || courseFound.subject;
                courseFound.purpose = courseData.purpose || courseFound.purpose;
                courseFound.description = courseData.description || courseFound.description;
                courseFound.teacher = courseData.teacher || courseFound.teacher;
                courseFound.deleted = courseData.deleted ?? courseFound.deleted;
                courseFound.updated_at = DateUtils.formatDate(new Date());
    
                return await CourseRepository.updateCourse(courseId, courseFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error modifying course: ${error.message}`);
        }
    }

    public static async deleteCourse(courseId: number): Promise<boolean> {
        try {
            const result = await CourseRepository.deleteCourse(courseId);
            return result ? true : false;
        } catch (error: any) {
            throw new Error(`Error deleting course: ${error.message}`);
        }
    }

    public static async deleteCourseLogic(courseId: number): Promise<boolean> {
        try {
            const result = await CourseRepository.deleteLogic(courseId);
            return result ? true : false;
        } catch (error: any) {
            throw new Error(`Error logically deleting course: ${error.message}`);
        }
    }
}