import { Request, Response } from 'express';
import { RoleService } from '../services/roleService';
import { Role } from '../models/Role';

export const getRoleByName = async (req: Request, res: Response) => {
    const { roleName } = req.params;
    console.log('Fetching role with name:', roleName); // Add logging
    try {
        const role = await RoleService.findRoleByName(roleName);
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


export const createRole = async (req: Request, res: Response) => {
    const roleData: Role = req.body;
    try {
        await RoleService.createRole(roleData);
        res.status(201).json({ message: 'Role created successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};