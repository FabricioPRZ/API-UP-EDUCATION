import { LessonRepository } from "../repositories/LessonRepository";
import { Lesson } from "../models/Lesson";
import { DateUtils } from "../../shared/utils/DateUtils"; 
import dotenv from 'dotenv';

dotenv.config();

export class LessonService {

    public static async getAllLessons(): Promise<Lesson[]> {
        try {
            return await LessonRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error getting lessons: ${error.message}`);
        }
    }

    public static async getLessonById(lessonId: number): Promise<Lesson | null> {
        try {
            return await LessonRepository.findById(lessonId);
        } catch (error: any) {
            throw new Error(`Error finding lesson: ${error.message}`);
        }
    }

    public static async addLesson(file: Express.Multer.File | undefined, lesson: Lesson): Promise<Lesson> {
        try {
            // Determina la URL del archivo si existe
            const urlFile = file ? `http://localhost:3000/uploads/${file.filename}` : lesson.url || '';

            // Asigna las fechas y la URL
            lesson.created_at = DateUtils.formatDate(new Date());
            lesson.updated_at = DateUtils.formatDate(new Date());
            lesson.url = urlFile;

            return await LessonRepository.createLesson(lesson);
        } catch (error: any) {
            throw new Error(`Error creating lesson: ${error.message}`);
        }
    }

    public static async modifyLesson(lessonId: number, lessonData: Lesson, file?: Express.Multer.File): Promise<Lesson | null> {
        try {
            const lessonFound = await LessonRepository.findById(lessonId);
            if (lessonFound) {
                // Actualiza los campos de la lección
                lessonFound.module_id = lessonData.module_id ?? lessonFound.module_id;
                lessonFound.title = lessonData.title ?? lessonFound.title;
                lessonFound.description = lessonData.description ?? lessonFound.description;
                
                // Si hay un archivo, actualiza la URL del archivo
                if (file) {
                    lessonFound.url = `http://localhost:3000/uploads/${file.filename}`;
                } else if (lessonData.url) {
                    // Usa la URL proporcionada si no hay un nuevo archivo
                    lessonFound.url = lessonData.url;
                }

                lessonFound.updated_at = DateUtils.formatDate(new Date());

                return await LessonRepository.updateLesson(lessonId, lessonFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error modifying lesson: ${error.message}`);
        }
    }

    public static async deleteLesson(lessonId: number): Promise<boolean> {
        try {
            return await LessonRepository.deleteLesson(lessonId);
        } catch (error: any) {
            throw new Error(`Error deleting lesson: ${error.message}`);
        }
    }

    public static async deleteLessonLogic(lessonId: number): Promise<boolean> {
        try {
            return await LessonRepository.deleteLessonLogic(lessonId);
        } catch (error: any) {
            throw new Error(`Error logically deleting lesson: ${error.message}`);
        }
    }
}
