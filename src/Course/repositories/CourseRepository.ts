import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Course } from '../models/course';

export class CourseRepository {
    public static async findAll(): Promise<Course[]> {
        const query = 'SELECT * FROM course WHERE deleted = 0';
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const modules: Course[] = results as Course[];
                    resolve(modules);
                }
            });
        });
    }

    public static async findById(id: number): Promise<Course | null> {
        const query = 'SELECT * FROM course WHERE course_id = ? AND deleted = 0';
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const modules: Course[] = results as Course[];
                    if (modules.length > 0) {
                        resolve(modules[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createCourse(newCourse: Course): Promise<Course> {
        const query = 'INSERT INTO course SET ?';
        return new Promise((resolve, reject) => {
            connection.query(query, newCourse, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const insertedId = (results as ResultSetHeader).insertId;
                    resolve({ ...newCourse, course_id: insertedId });
                }
            });
        });
    }

    public static async updateCourse(id: number, updatedCourse: Course): Promise<Course> {
        const query = 'UPDATE course SET ? WHERE course_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [updatedCourse, id], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ ...updatedCourse, course_id: id });
                }
            });
        });
    }

    public static async deleteCourse(id: number): Promise<boolean> {
        const query = 'DELETE FROM course WHERE course_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    public static async deleteLogic(id: number): Promise<boolean> {
        const query = 'UPDATE course SET deleted = 1 WHERE course_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }
}