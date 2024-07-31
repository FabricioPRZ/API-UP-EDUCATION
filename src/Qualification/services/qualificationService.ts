import { QualificationRepository } from "../repositories/QualificationRepository";
import { Qualification } from "../models/Qualification";
import { DateUtils } from "../../shared/utils/DateUtils"; 
import dotenv from 'dotenv';

dotenv.config();

export class QualificationService {

    public static async getAllQualifications(): Promise<Qualification[]> {
        try {
            return await QualificationRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error getting qualifications: ${error.message}`);
        }
    }

    public static async getQualificationById(qualificationId: number): Promise<Qualification | null> {
        try {
            return await QualificationRepository.findById(qualificationId);
        } catch (error: any) {
            throw new Error(`Error finding qualification: ${error.message}`);
        }
    }

    public static async addQualification(qualification: Qualification): Promise<Qualification> {
        try {
            qualification.created_at = DateUtils.formatDate(new Date());
            qualification.updated_at = DateUtils.formatDate(new Date());

            const createdQualification = await QualificationRepository.createQualification(qualification);

            return createdQualification;
        } catch (error: any) {
            throw new Error(`Error creating qualification: ${error.message}`);
        }
    }

    public static async modifyQualification(qualificationId: number, qualificationData: Qualification): Promise<Qualification | null> {
        try {
            const qualificationFound = await QualificationRepository.findById(qualificationId);
            if (qualificationFound) {
                if (qualificationData.user_id) {
                    qualificationFound.user_id = qualificationData.user_id;
                }
                
                if (qualificationData.porcentaje) {
                    qualificationFound.porcentaje = qualificationData.porcentaje;
                }
                if (qualificationData.deleted !== undefined) {
                    qualificationFound.deleted = qualificationData.deleted;
                }
                qualificationFound.updated_at = DateUtils.formatDate(new Date());

                return await QualificationRepository.updateQualification(qualificationId, qualificationFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error modifying qualification: ${error.message}`);
        }
    }

    public static async deleteQualification(qualificationId: number): Promise<boolean> {
        try {
            return await QualificationRepository.deleteQualification(qualificationId);
        } catch (error: any) {
            throw new Error(`Error deleting qualification: ${error.message}`);
        }
    }

    public static async deleteQualificationLogic(qualificationId: number): Promise<boolean> {
        try {
            return await QualificationRepository.deleteLogic(qualificationId);
        } catch (error: any) {
            throw new Error(`Error logically deleting qualification: ${error.message}`);
        }
    }
}
