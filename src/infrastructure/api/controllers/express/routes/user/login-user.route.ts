// src/infrastructure/api/express/routes/user/login-user.route.ts
import express from 'express';
import { loginUserController } from '../../../login.controller'

const router = express.Router();

router.post('/login', loginUserController);

export default router;
