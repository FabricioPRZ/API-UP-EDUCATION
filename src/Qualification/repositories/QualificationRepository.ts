import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { Qualification } from "../models/Qualification";

export class QualificationRepository {

    public static async findAll(): Promise<Qualification[]> {
        const query = "SELECT * FROM qualification WHERE deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const qualifications: Qualification[] = results as Qualification[];
                    resolve(qualifications);
                }
            });
        });
    }

    public static async findById(id: number): Promise<Qualification | null> {
        const query = "SELECT * FROM qualification WHERE qualification_id = ? AND deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const qualifications: Qualification[] = results as Qualification[];
                    if (qualifications.length > 0) {
                        resolve(qualifications[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createQualification(qualification: Qualification): Promise<Qualification> {
        const { qualification_id, user_id, porcentaje, created_by, created_at, updated_by, updated_at, deleted } = qualification;
        const query = `INSERT INTO qualification (qualification_id, user_id,porcentaje, created_by, created_at, updated_by, updated_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [qualification_id, user_id, porcentaje, created_by, created_at, updated_by, updated_at, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createQualificationId = (result as any).insertId;
                    const createdQualification: Qualification = { ...qualification, qualification_id: createQualificationId };
                    resolve(createdQualification);
                }
            });
        });
    }

    public static async updateQualification(qualificationId: number, qualificationData: Qualification): Promise<Qualification | null> {
        const { user_id, porcentaje, updated_at, updated_by, deleted } = qualificationData;
        const query = `UPDATE qualification SET user_id = ?, porcentaje = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE qualification_id = ?`;
        const values = [user_id, porcentaje, updated_at, updated_by, deleted ? 1 : 0, qualificationId];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...qualificationData, qualification_id: qualificationId });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteQualification(id: number): Promise<boolean> {
        const query = 'DELETE FROM qualification WHERE qualification_id = ?';
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
        const query = 'UPDATE qualification SET deleted = 1 WHERE qualification_id = ?';
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
