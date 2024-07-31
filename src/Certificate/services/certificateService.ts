import { CertificateRepository } from "../repositories/CertificateRepository";
import { Certificate } from "../models/Certificate";
import { DateUtils } from "../../shared/utils/DateUtils"; 
import dotenv from 'dotenv';

dotenv.config();

export class CertificateService {

    public static async getAllCertificates(): Promise<Certificate[]> {
        try {
            return await CertificateRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error getting certificates: ${error.message}`);
        }
    }

    public static async getCertificateById(certificateId: number): Promise<Certificate | null> {
        try {
            return await CertificateRepository.findById(certificateId);
        } catch (error: any) {
            throw new Error(`Error finding certificate: ${error.message}`);
        }
    }

    public static async addCertificate(certificate: Certificate): Promise<Certificate> {
        try {
            certificate.created_at = DateUtils.formatDate(new Date());
            certificate.updated_at = DateUtils.formatDate(new Date());

            const createdCertificate = await CertificateRepository.createCertificate(certificate);

            return createdCertificate;
        } catch (error: any) {
            throw new Error(`Error creating certificate: ${error.message}`);
        }
    }

    public static async modifyCertificate(certificateId: number, certificateData: Certificate): Promise<Certificate | null> {
        try {
            const certificateFound = await CertificateRepository.findById(certificateId);
            if (certificateFound) {
                certificateFound.LocaleDate = certificateData.LocaleDate;
                certificateFound.DateTime = certificateData.DateTime;
                certificateFound.subject = certificateData.subject;
                certificateFound.ubication = certificateData.ubication;
                certificateFound.boolean = certificateData.boolean;
                certificateFound.updated_by = certificateData.updated_by;
                certificateFound.updated_at = DateUtils.formatDate(new Date());

                return await CertificateRepository.updateCertificate(certificateId, certificateFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error modifying certificate: ${error.message}`);
        }
    }

    public static async deleteCertificate(certificateId: number): Promise<boolean> {
        try {
            return await CertificateRepository.deleteCertificate(certificateId);
        } catch (error: any) {
            throw new Error(`Error deleting certificate: ${error.message}`);
        }
    }

    public static async deleteCertificateLogic(certificateId: number): Promise<boolean> {
        try {
            return await CertificateRepository.deleteLogic(certificateId);
        } catch (error: any) {
            throw new Error(`Error logically deleting certificate: ${error.message}`);
        }
    }
}
