import { MaterialCourseRepository } from "../repositories/MaterialCourseRepository";
import { MaterialCourse } from "../models/MaterialCourse";
import dotenv from 'dotenv';

dotenv.config();


export class MaterialCourseService {

    public static async getAllMaterialCourses(): Promise<MaterialCourse[]> {
        try {
            return await MaterialCourseRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error getting material courses: ${error.message}`);
        }
    }

    public static async getMaterialCourseById(courseId: number): Promise<MaterialCourse | null> {
        try {
            return await MaterialCourseRepository.findById(courseId);
        } catch (error: any) {
            throw new Error(`Error getting material course: ${error.message}`);
        }
    }

    public static async addMaterialCourse(materialCourseData: MaterialCourse): Promise<MaterialCourse> {
        try {
            return await MaterialCourseRepository.createMaterialCourse(materialCourseData);
        } catch (error: any) {
            throw new Error(`Error adding material course: ${error.message}`);
        }
    }

    public static async modifyMaterialCourse(courseId: number, materialCourseData: MaterialCourse): Promise<MaterialCourse | null> {
        try {
            return await MaterialCourseRepository.updateMaterialCourse(courseId, materialCourseData);
        } catch (error: any) {
            throw new Error(`Error updating material course: ${error.message}`);
        }
    }

    public static async deleteMaterialCourse(courseId: number): Promise<boolean> {
        try {
            return await MaterialCourseRepository.deleteMaterialCourse(courseId);
        } catch (error: any) {
            throw new Error(`Error deleting material course: ${error.message}`);
        }
    }

    public static async deleteMaterialCourseLogic(courseId: number): Promise<boolean> {
        try {
            return await MaterialCourseRepository.deleteLogic(courseId);
        } catch (error: any) {
            throw new Error(`Error logically deleting material course: ${error.message}`);
        }
    }
}
