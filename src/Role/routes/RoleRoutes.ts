import { Router } from 'express';
import { getRoleByName, createRole } from '../controllers/roleController';

const roleRoutes: Router = Router();

roleRoutes.get('/:roleName', getRoleByName);
roleRoutes.post('/', createRole);

export default roleRoutes;