import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserRepository } from '../../User/repositories/UserRepository';
import { UserPayload } from '../config/types/userPayload';
import { AuthRequest } from '../config/types/authRequest';

dotenv.config();

const secretKey = process.env.SECRET || "";

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token, secretKey) as UserPayload;
    const employee = await UserRepository.findById(payload.id);

    if (!employee) {
      console.log('Invalid token: employee not found'); 
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userData = payload;
    return next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      console.log('Token expired'); 
      return res.status(401).json({ message: 'Token expired' });
    }
    console.log('Unauthorized access', error); 
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
