import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { UserCourse } from "../models/UserCourse";

export class UserCourseRepository {

    public static async findAll(): Promise<UserCourse[]> {
        const query = "SELECT * FROM user_course";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const userCourses: UserCourse[] = results as UserCourse[];
                    resolve(userCourses);
                }
            });
        });
    }

    public static async findById(userId: number, courseId: number): Promise<UserCourse | null> {
        const query = "SELECT * FROM user_course WHERE user_id = ? AND course_id = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [userId, courseId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const userCourses: UserCourse[] = results as UserCourse[];
                    if (userCourses.length > 0) {
                        resolve(userCourses[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createUserCourse(userCourse: UserCourse): Promise<UserCourse> {
        const { user_id, course_id } = userCourse;
        const query = `INSERT INTO user_course (user_id, course_id) VALUES (?, ?)`;
        const values = [user_id, course_id];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(userCourse);
                }
            });
        });
    }

    public static async deleteUserCourse(userId: number, courseId: number): Promise<boolean> {
        const query = 'DELETE FROM user_course WHERE user_id = ? AND course_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [userId, courseId], (error, result) => {
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
