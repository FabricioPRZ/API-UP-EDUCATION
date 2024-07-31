import { examRepository } from "../repositories/examRepository";
import { exam } from "../models/exam";
import { DateUtils } from "../../shared/utils/DateUtils"; 
import dotenv from 'dotenv';

dotenv.config();

export class examService {

    public static async getAllExams(): Promise<exam[]> {
        try {
            return await examRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error getting exams: ${error.message}`);
        }
    }

    public static async getExamById(examId: number): Promise<exam | null> {
        try {
            return await examRepository.findById(examId);
        } catch (error: any) {
            throw new Error(`Error finding exam: ${error.message}`);
        }
    }


    public static async addExam(exam: exam) {
        try {
            
            exam.created_at = DateUtils.formatDate(new Date()); 
            exam.updated_at = DateUtils.formatDate(new Date()); 

            const createdExam = await examRepository.createExam(exam);

            return { exam: createdExam };
        } catch (error: any) {
            throw new Error(`Error creating exam: ${error.message}`);
        }
    }

    public static async modifyExam(examId: number, examData: exam) {
        try {
            const examFound = await examRepository.findById(examId);
            if (examFound) {

                if (examData.title) {
                    examFound.title = examData.title;
                }
                if (examData.questions) {
                    examFound.questions = examData.questions;
                }
                
                if (examData.deleted !== undefined) {
                    examFound.deleted = examData.deleted;
                }
                examFound.updated_at = DateUtils.formatDate(new Date());

                return await examRepository.updateExam(examId, examFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error modifying exam: ${error.message}`);
        }
    }

    public static async deleteExam(examId: number): Promise<boolean> {
        try {
            return await examRepository.deleteExam(examId);
        } catch (error: any) {
            throw new Error(`Error deleting exam: ${error.message}`);
        }
    }

    public static async deleteExamLogic(examId: number): Promise<boolean> {
        try {
            return await examRepository.deleteLogic(examId);
        } catch (error: any) {
            throw new Error(`Error logically deleting exam: ${error.message}`);
        }
    }
}
