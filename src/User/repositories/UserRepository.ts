import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { User } from "../models/User";

export class UserRepository {

    public static async findAll(): Promise<User[]> {
        const query = "SELECT * FROM user WHERE deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    resolve(users);
                }
            });
        });
    }
    
    public static async findById(id: number): Promise<User | null> {
        const query = "SELECT * FROM user WHERE user_id = ? AND deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    if (users.length > 0) {
                        resolve(users[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    
    public static async findByName(name: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE name= ?', [name], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    if (users.length > 0) {
                        resolve(users[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async findByEmail(email: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE email= ?', [email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    if (users.length > 0) {
                        resolve(users[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createUser(user: User): Promise<User> {
        const { user_id, name, second_name, last_name_paternal, last_name_maternal, role_name, email, pdf, password, created_by, updated_by, deleted } = user;
        const query = `INSERT INTO user (user_id, name, second_name, last_name_paternal, last_name_maternal, role_name, email, pdf, password, created_by, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [user_id, name, second_name, last_name_paternal, last_name_maternal, role_name, email, pdf, password, created_by, updated_by, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error) => {
                if (error) {
                    console.error('Database error:', error);
                    reject(error);
                } else {
                    const createdUser: User = { ...user };
                    resolve(createdUser);
                }
            });
        });
    }     
    
    public static async updateUser(userId: number, userData: User): Promise<User | null> {
        const { name, second_name, last_name_paternal, last_name_maternal, role_name, email, pdf, password, updated_at, updated_by, deleted } = userData;
        const query = `
            UPDATE user 
            SET 
                name = ?, 
                second_name = ?, 
                last_name_paternal = ?, 
                last_name_maternal = ?, 
                role_name = ?, 
                email = ?, 
                pdf = ?, 
                password = ?,  
                updated_at = ?, 
                updated_by = ?, 
                deleted = ? 
            WHERE user_id = ?`;
        const values = [name, second_name, last_name_paternal, last_name_maternal, role_name, email, pdf, password, updated_at, updated_by, deleted ? 1 : 0, userId];
    
        try {
            console.log('Query:', query);  // Log the query
            console.log('Values:', values);  // Log the values
    
            const result: any = await new Promise((resolve, reject) => {
                connection.query(query, values, (error, result) => {
                    if (error) {
                        console.error('Query Error:', error);  // Log the error
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
    
            console.log('Update Result:', result);  // Log the result
    
            if (result.affectedRows > 0) {
                // Return the updated user data
                return { ...userData, user_id: userId };
            } else {
                return null;
            }
        } catch (error) {
            // Assert error type as Error
            if (error instanceof Error) {
                console.error('Catch Error:', error.message);  // Log the error message
                throw new Error(`Error updating user: ${error.message}`);
            } else {
                console.error('Unknown Error:', error);  // Log the unknown error
                throw new Error('Unknown error updating user');
            }
        }
    }

    public static async deleteUser(id: number): Promise<boolean> {
        const query = 'DELETE FROM user WHERE user_id = ?';
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
        const query = 'UPDATE user SET deleted = 1 WHERE user_id = ?';
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