import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Lesson } from '../models/Lesson';

export class LessonRepository {

    public static async findAll(): Promise<Lesson[]> {
        const query = "SELECT * FROM lesson WHERE deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const lessons: Lesson[] = results as Lesson[];
                    resolve(lessons);
                }
            });
        });
    }

    public static async findById(id: number): Promise<Lesson | null> {
        const query = "SELECT * FROM lesson WHERE lesson_id = ? AND deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const lessons: Lesson[] = results as Lesson[];
                    if (lessons.length > 0) {
                        resolve(lessons[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createLesson(lesson: Lesson): Promise<Lesson> {
        const { module_id, title, description, url, created_by, created_at, updated_by, updated_at, deleted } = lesson;
        const query = `INSERT INTO lesson (module_id, title, description, url, created_by, created_at, updated_by, updated_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [module_id, title, description, url, created_by, created_at, updated_by, updated_at, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createdLessonId = (result as any).insertId;
                    const createdLesson: Lesson = { ...lesson, lesson_id: createdLessonId };
                    resolve(createdLesson);
                }
            });
        });
    }

    public static async updateLesson(lessonId: number, lessonData: Lesson): Promise<Lesson | null> {
        const { module_id, title, description, url, updated_at, updated_by, deleted } = lessonData;
        const query = `UPDATE lesson SET module_id = ?, title = ?, description = ?, url = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE lesson_id = ?`;
        const values = [module_id, title, description, url, updated_at, updated_by, deleted ? 1 : 0, lessonId];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...lessonData, lesson_id: lessonId });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteLesson(id: number): Promise<boolean> {
        const query = 'DELETE FROM lesson WHERE lesson_id = ?';
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

    public static async deleteLessonLogic(id: number): Promise<boolean> {
        const query = 'UPDATE lesson SET deleted = 1 WHERE lesson_id = ?';
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
