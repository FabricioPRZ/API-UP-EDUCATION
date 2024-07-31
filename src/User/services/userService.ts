import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/User";
import { RoleRepository } from "../../Role/repositories/RoleRepository"; 
import { DateUtils } from "../../shared/utils/DateUtils"; 
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || "";
const saltRounds = 10;

export class UserService {

    public static async login(email: string, password: string) {
        try {
            const user = await this.getUserByEmail(email);
            if (!user) {
                return null;
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return null;
            }
            const payload = { 
                id: user.user_id, 
                email: user.email, 
                role_name: user.role_name
            };
            return jwt.sign(payload, secretKey, { expiresIn: '24h' });
        } catch (error: any) {
            throw new Error(`Login error: ${error.message}`);
        }
    }
    
    

    public static async getAllUser(): Promise<User[]> {
        try {
            return await UserRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error getting users: ${error.message}`);
        }
    }

    public static async getUserById(userId: number): Promise<User | null> {
        try {
            return await UserRepository.findById(userId);
        } catch (error: any) {
            throw new Error(`Error finding user: ${error.message}`);
        }
    }

    public static async getUserByName(name: string): Promise<User | null> {
        try {
            return await UserRepository.findByName(name);
        } catch (error: any) {
            throw new Error(`Error finding user by name: ${error.message}`);
        }
    }

    public static async getUserByEmail(email: string): Promise<User | null> {
        try {
            return await UserRepository.findByEmail(email);
        } catch (error: any) {
            throw new Error(`Error finding user by email: ${error.message}`);
        }
    }

    public static async addUser(file: Express.Multer.File | undefined, user: User) {
        try {
            const role = await RoleRepository.findByName(user.role_name); // Verificar si el rol existe

            if (!role) {
                throw new Error('Role does not exist');
            }

            const salt = await bcrypt.genSalt(saltRounds);

            if (!user.password) {
                throw new Error('Password is required');
            }

            user.created_at = DateUtils.formatDate(new Date()); 
            user.updated_at = DateUtils.formatDate(new Date()); 

            user.password = await bcrypt.hash(user.password, salt);

            if (file) {
                const pdfUrl = `http://localhost:3000/uploads/${file.filename}`;
                user.pdf = pdfUrl;
            }

            const createdUser = await UserRepository.createUser(user);

            return { user: createdUser };
        } catch (error: any) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    public static async modifyUser(userId: number, userData: User, file?: Express.Multer.File) {
        try {
            const userFinded = await UserRepository.findById(userId);
            if (userFinded) {
                const salt = await bcrypt.genSalt(saltRounds);

                // Verificar y actualizar cada campo de userData si está presente
                if (userData.name) {
                    userFinded.name = userData.name;
                }
                if (userData.second_name) {
                    userFinded.second_name = userData.second_name;
                }
                if (userData.last_name_paternal) {
                    userFinded.last_name_paternal = userData.last_name_paternal;
                }
                if (userData.last_name_maternal) {
                    userFinded.last_name_maternal = userData.last_name_maternal;
                }
                if (userData.role_name) {
                    userFinded.role_name = userData.role_name;
                }
                if (userData.email) {
                    userFinded.email = userData.email;
                }
                if (userData.password) {
                    userFinded.password = await bcrypt.hash(userData.password, salt);
                }
                if (file) {
                    const pdfUrl = `http://localhost:3000/uploads/${file.filename}`;
                    userFinded.pdf = pdfUrl;
                }

                userFinded.updated_at = DateUtils.formatDate(new Date());
                userFinded.updated_by = userData.updated_by;

                return await UserRepository.updateUser(userId, userFinded);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error modifying user: ${error.message}`);
        }
    }

    public static async deleteUser(userId: number): Promise<boolean> {
        try {
            const userExists = await UserRepository.findById(userId);
            if (userExists) {
                await UserRepository.deleteUser(userId);
                return true;
            } else {
                return false;
            }
        } catch (error: any) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }

    public static async deleteUserLogic(userId: number): Promise<boolean> {
        try {
            const userExists = await UserRepository.findById(userId);
            if (userExists) {
                await UserRepository.deleteLogic(userId);
                return true;
            } else {
                return false;
            }
        } catch (error: any) {
            throw new Error(`Error logically deleting user: ${error.message}`);
        }
    }
}
