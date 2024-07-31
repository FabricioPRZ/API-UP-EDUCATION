import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { Progress } from "../models/Progress";

export class ProgressRepository {

    public static async findAll(): Promise<Progress[]> {
        const query = "SELECT * FROM progress WHERE deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const progresses: Progress[] = results as Progress[];
                    resolve(progresses);
                }
            });
        });
    }
    
    public static async findById(id: number): Promise<Progress | null> {
        const query = "SELECT * FROM progress WHERE progress_id = ? AND deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const progresses: Progress[] = results as Progress[];
                    if (progresses.length > 0) {
                        resolve(progresses[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    
    public static async createProgress(progress: Progress): Promise<Progress> {
        const { progress_id, user_id, course_id, porcentaje, complete, created_by, created_at, updated_by, updated_at, deleted } = progress;
        const query = `INSERT INTO progress (progress_id,user_id, course_id, porcentaje, complete, created_by, created_at, updated_by, updated_at, deleted) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [progress_id, user_id, course_id, porcentaje, complete, created_by, created_at, updated_by, updated_at, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createProgressId = (result as any).insertId;
                    const createdProgress: Progress = { ...progress, progress_id: createProgressId };
                    resolve(createdProgress);
                }
            });
        });
    }
    
    public static async updateProgress(progressId: number, progressData: Progress): Promise<Progress | null> {
        const { course_id, porcentaje, complete, updated_at, updated_by, deleted } = progressData;
        const query = `UPDATE progress SET course_id = ?, porcentaje = ?, complete = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE progress_id = ?`;
        const values = [course_id, porcentaje, complete, updated_at, updated_by, deleted ? 1 : 0, progressId];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...progressData, progress_id: progressId });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteProgress(id: number): Promise<boolean> {
        const query = 'DELETE FROM progress WHERE progress_id = ?';
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
        const query = 'UPDATE progress SET deleted = 1 WHERE progress_id = ?';
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
