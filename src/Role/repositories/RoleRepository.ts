import connection from "../../shared/config/database";
import { Role } from "../models/Role";

export class RoleRepository {
    public static async findByName(roleName: string): Promise<Role | null> {
        const query = 'SELECT * FROM role WHERE role_name = ? AND deleted = 0';
        return new Promise((resolve, reject) => {
            connection.query(query, [roleName], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const roles: Role[] = results as Role[];
                    if (roles.length > 0) {
                        resolve(roles[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async insertRole(role: Role): Promise<void> {
        const query = `
            INSERT INTO role (role_name, created_by, created_at, updated_by, updated_at, deleted)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        return new Promise((resolve, reject) => {
            connection.query(query, [role.role_name, role.created_by, role.created_at, role.updated_by, role.updated_at, role.deleted], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}