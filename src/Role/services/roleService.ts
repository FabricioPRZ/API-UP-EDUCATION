import { RoleRepository } from "../repositories/RoleRepository";
import { Role } from "../models/Role";

export class RoleService {
    public static async findRoleByName(roleName: string): Promise<Role | null> {
        return await RoleRepository.findByName(roleName);
    }

    public static async createRole(role: Role): Promise<void> {
        await RoleRepository.insertRole(role);
    }
}