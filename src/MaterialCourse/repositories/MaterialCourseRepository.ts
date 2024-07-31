import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { MaterialCourse } from "../models/MaterialCourse";

export class MaterialCourseRepository {

    public static async findAll(): Promise<MaterialCourse[]> {
        const query = "SELECT * FROM materialcourse WHERE deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const materialCourses: MaterialCourse[] = results as MaterialCourse[];
                    resolve(materialCourses);
                }
            });
        });
    }
    
    public static async findById(id: number): Promise<MaterialCourse | null> {
        const query = "SELECT * FROM materialcourse WHERE course_id = ? AND deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const materialCourses: MaterialCourse[] = results as MaterialCourse[];
                    if (materialCourses.length > 0) {
                        resolve(materialCourses[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    
    public static async createMaterialCourse(materialCourse: MaterialCourse): Promise<MaterialCourse> {
        const { course_id, name, type, content, created_by, created_at, updated_by, updated_at, deleted } = materialCourse;
        const query = `INSERT INTO MaterialCourse (course_id, name, type, content, created_by, created_at, updated_by, updated_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [course_id, name, type, content, created_by, created_at, updated_by, updated_at, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createMaterialCourseId = (result as any).insertId;
                    const createdMaterialCourse: MaterialCourse = { ...materialCourse, course_id: createMaterialCourseId };
                    resolve(createdMaterialCourse);
                }
            });
        });
    }
    
    public static async updateMaterialCourse(courseId: number, materialCourseData: MaterialCourse): Promise<MaterialCourse | null> {
        const { name, type, content, updated_at, updated_by, deleted } = materialCourseData;
        const query = `UPDATE MaterialCourse SET name = ?, type = ?, content = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE course_id = ?`;
        const values = [name, type, content, updated_at, updated_by, deleted ? 1 : 0, courseId];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...materialCourseData, course_id: courseId });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteMaterialCourse(id: number): Promise<boolean> {
        const query = 'DELETE FROM MaterialCourse WHERE course_id = ?';
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
        const query = 'UPDATE MaterialCourse SET deleted = 1 WHERE course_id = ?';
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
