import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { Certificate } from "../models/Certificate";

export class CertificateRepository {

    public static async findAll(): Promise<Certificate[]> {
        const query = "SELECT * FROM certificate WHERE deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const certificates: Certificate[] = results as Certificate[];
                    resolve(certificates);
                }
            });
        });
    }

    public static async findById(id: number): Promise<Certificate | null> {
        const query = "SELECT * FROM certificate WHERE certificate_id = ? AND deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const certificates: Certificate[] = results as Certificate[];
                    if (certificates.length > 0) {
                        resolve(certificates[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createCertificate(certificate: Certificate): Promise<Certificate> {
        const { certificate_id, LocaleDate, DateTime, subject, ubication, boolean, created_by, created_at, updated_by, updated_at } = certificate;
        const query = `INSERT INTO certificate (certificate_id, LocaleDate, DateTime, subject, ubication, boolean, created_by, created_at, updated_by, updated_at) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [certificate_id, LocaleDate, DateTime, subject, ubication, boolean ? 1 : 0, created_by, created_at, updated_by, updated_at];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createCertificateId = (result as any).insertId;
                    const createdCertificate: Certificate = { ...certificate, certificate_id: createCertificateId };
                    resolve(createdCertificate);
                }
            });
        });
    }

    public static async updateCertificate(certificateId: number, certificateData: Certificate): Promise<Certificate | null> {
        const {  LocaleDate, DateTime, subject, ubication, boolean, updated_by, updated_at } = certificateData;
        const query = `UPDATE certificate SET LocaleDate = ?, DateTime = ?, subject = ?, ubication = ?, boolean = ?, updated_by = ?, updated_at = ? WHERE certificate_id = ?`;
        const values = [ LocaleDate, DateTime, subject, ubication, boolean ? 1 : 0, updated_by, updated_at, certificateId];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...certificateData, certificate_id: certificateId });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteCertificate(id: number): Promise<boolean> {
        const query = 'DELETE FROM certificate WHERE certificate_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }

    public static async deleteLogic(id: number): Promise<boolean> {
        const query = 'UPDATE certificate SET deleted = 1 WHERE certificate_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false); 
                    }
                }
            });
        });
    }
}
