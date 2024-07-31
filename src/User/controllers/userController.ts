import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const secretKey = process.env.SECRET || '';

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const token = await UserService.login(email, password);

        if (!token) {
            res.status(401).json({ message: 'Invalid email or password' });
        } else {
            const payload = jwt.verify(token, secretKey) as any;
            res.status(200).json({
                token,
                id: payload.id,
                role_name: payload.role_name
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUser();
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'No users found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const user = await UserService.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUserData: Partial<User> = req.body;
        const file = req.file;
        
        // Handle cases where file might not be uploaded
        const result = await UserService.addUser(file, newUserData as User);
        res.status(201).json({ message: 'User created', userId: result.user.user_id });
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const updatedUserData: User = req.body;
        const file = req.file;

        const result = await UserService.modifyUser(userId, updatedUserData, file);
        if (result) {
            res.status(200).json({ message: 'User updated', user: result });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const deleted = await UserService.deleteUser(userId);
        if (deleted) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found or deletion failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const success = await UserService.deleteUserLogic(userId);
        if (success) {
            res.status(200).json({ message: 'User logically deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found or logical deletion failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
