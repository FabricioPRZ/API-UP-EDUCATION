import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { exam } from "../models/exam";

export class examRepository {

    public static async findAll(): Promise<exam[]> {
        const query = "SELECT * FROM exam WHERE deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const exams: exam[] = results as exam[];
                    resolve(exams);
                }
            });
        });
    }
    
    public static async findById(id: number): Promise<exam | null> {
        const query = "SELECT * FROM exam WHERE exam_id = ? AND deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const exams: exam[] = results as exam[];
                    if (exams.length > 0) {
                        resolve(exams[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    
    public static async findByName(title: string): Promise<exam | null> {
        return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM exam WHERE title = ?', [title], (error, results) => {
            if (error) {
              reject(error);
            } else {
              const exams: exam[] = results as exam[];
              if (exams.length > 0) {
                resolve(exams[0]);
              } else {
                resolve(null);
              }
            }
          });
        });
      }

      public static async findByEmail(email: string): Promise<exam | null> {
        return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM user WHERE email = ?', [email], (error, results) => {
            if (error) {
              reject(error);
            } else {
              const users: exam[] = results as exam[];
              if (users.length > 0) {
                resolve(users[0]);
              } else {
                resolve(null);
              }
            }
          });
        });
      }

    public static async createExam(exam: exam): Promise<exam> {
        const { exam_id, module_id, title, questions, created_by, created_at, updated_by, updated_at, deleted } = exam;
        const query = `INSERT INTO exam (exam_id, module_id, title, questions, created_by, created_at, updated_by, updated_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [exam_id, module_id, title, questions, created_by, created_at, updated_by, updated_at, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createExamId = (result as any).insertId;
                    const createdExam: exam = { ...exam, exam_id: createExamId };
                    resolve(createdExam);
                }
            });
        });
    }
    
    public static async updateExam(examId: number, examData: exam): Promise<exam | null> {
        const { title, questions, updated_at, updated_by, deleted } = examData;
        const query = `UPDATE exam SET title = ?, questions = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE exam_id = ?`;
        const values = [title, questions, updated_at, updated_by, deleted ? 1 : 0, examId];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...examData, exam_id: examId });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteExam(id: number): Promise<boolean> {
        const query = 'DELETE FROM exam WHERE exam_id = ?';
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
        const query = 'UPDATE exam SET deleted = 1 WHERE exam_id = ?';
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
