import express from 'express';
import { registerUserController } from '../../../controllers/user.controller';

const router = express.Router();

router.post('/register', registerUserController);

export default router;
