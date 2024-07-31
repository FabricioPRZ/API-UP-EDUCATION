import { UserCourseRepository } from "../repositories/UserCourseRepository";
import { UserCourse } from "../models/UserCourse";

export class UserCourseService {

    public static async getAllUserCourses(): Promise<UserCourse[]> {
        try {
            return await UserCourseRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error getting user courses: ${error.message}`);
        }
    }

    public static async getUserCourseById(userId: number, courseId: number): Promise<UserCourse | null> {
        try {
            return await UserCourseRepository.findById(userId, courseId);
        } catch (error: any) {
            throw new Error(`Error finding user course: ${error.message}`);
        }
    }

    public static async addUserCourse(userCourse: UserCourse): Promise<UserCourse> {
        try {
            return await UserCourseRepository.createUserCourse(userCourse);
        } catch (error: any) {
            throw new Error(`Error creating user course: ${error.message}`);
        }
    }

    public static async removeUserCourse(userId: number, courseId: number): Promise<boolean> {
        try {
            return await UserCourseRepository.deleteUserCourse(userId, courseId);
        } catch (error: any) {
            throw new Error(`Error deleting user course: ${error.message}`);
        }
    }
}
