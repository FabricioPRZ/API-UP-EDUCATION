import { ProgressRepository } from "../repositories/ProgressRepository";
import { Progress } from "../models/Progress";
import { DateUtils } from "../../shared/utils/DateUtils"; 
import dotenv from 'dotenv';

dotenv.config();

export class ProgressService {

    public static async getAllProgresses(): Promise<Progress[]> {
        try {
            return await ProgressRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error getting progresses: ${error.message}`);
        }
    }

    public static async getProgressById(progressId: number): Promise<Progress | null> {
        try {
            return await ProgressRepository.findById(progressId);
        } catch (error: any) {
            throw new Error(`Error finding progress: ${error.message}`);
        }
    }

    public static async addProgress(progress: Progress) {
        try {
            progress.created_at = DateUtils.formatDate(new Date()); 
            progress.updated_at = DateUtils.formatDate(new Date()); 

            const createdProgress = await ProgressRepository.createProgress(progress);

            return { progress: createdProgress };
        } catch (error: any) {
            throw new Error(`Error creating progress: ${error.message}`);
        }
    }

    public static async modifyProgress(progressId: number, progressData: Progress) {
        try {
            const progressFound = await ProgressRepository.findById(progressId);
            if (progressFound) {
                if (progressData.course_id) {
                    progressFound.course_id = progressData.course_id;
                }
                if (progressData.porcentaje) {
                    progressFound.porcentaje = progressData.porcentaje;
                }
                if (progressData.complete) {
                    progressFound.complete = progressData.complete;
                }
                if (progressData.deleted !== undefined) {
                    progressFound.deleted = progressData.deleted;
                }
                progressFound.updated_at = DateUtils.formatDate(new Date());

                return await ProgressRepository.updateProgress(progressId, progressFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error modifying progress: ${error.message}`);
        }
    }

    public static async deleteProgress(progressId: number): Promise<boolean> {
        try {
            return await ProgressRepository.deleteProgress(progressId);
        } catch (error: any) {
            throw new Error(`Error deleting progress: ${error.message}`);
        }
    }

    public static async deleteProgressLogic(progressId: number): Promise<boolean> {
        try {
            return await ProgressRepository.deleteLogic(progressId);
        } catch (error: any) {
            throw new Error(`Error logically deleting progress: ${error.message}`);
        }
    }

}